const fs = require("fs");
const path = require("path");

const pathProducts = path.join(__dirname, "products.json");

class ProductManager {
  products = [];

  constructor() {

    if (fs.existsSync(pathProducts)) {
      try {
        this.products = JSON.parse(fs.readFileSync(pathProducts, "utf-8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }
  // getProducts //

  getProducts() {
    return this.products;
  }

  // getProductById(pid): obtener producto por ID //

  getProductsById(pid) {
    const product = this.products.find((p) => p.id === pid);
    if (!product) {
      console.log("Producto no encontrado");
      return;
    }
    return product;
  }

  // addProduct(obj): agregar un nuevo producto (ID autogenerado) //

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const id = this.products.length + 1;
    const product = { id, title, description, price, thumbnail, code, stock };

    if (this.products.find((product) => product.code === code)) {
      console.log("Error: el producto ya existe");
      return;
    }

    this.products.push(product);
    fs.writeFileSync(pathProducts, JSON.stringify(this.products));
  }

  // updateProduct(pid, updateFields): actualizar campos de un producto (sin modificar el ID) //

  updateProduct(pid, updated) {
    this.products[pid - 1] = updated;
    fs.writeFileSync(pathProducts, JSON.stringify(this.products));
  }

  // deleteProduct(pid): eliminar producto por ID //

  deleteProduct(pid) {
    const product = this.products.find((p) => p.id === pid);
    if (!product) {
      console.log("Producto no encontrado");
      return;
    }
    this.products = this.products.filter((p) => p.id !== pid);
    fs.writeFileSync(pathProducts, JSON.stringify(this.products));
  }
}
module.exports = ProductManager;