const fs = require("fs");
const path = require("path");

const pathCart = path.join(__dirname, "carts.json");

class CartManager {
  carts = [];

  constructor() {
    if (fs.existsSync(pathCart)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(pathCart, "utf-8"));
      } catch (error) {
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  // createCart(): crear un nuevo carrito (ID autogenerado) //

  createCart() {
    const id = this.carts.length + 1;
    const products = [];
    const cart = { id, products };
    this.carts.push(cart);
    fs.writeFileSync(pathCart, JSON.stringify(this.carts));
  }

  // getCartById(cid): listar productos de un carrito //

    getCartById(cid) {
        const cart = this.carts.find((c) => c.id === cid);
        if (!cart) {
        console.log("Carrito no encontrado");
        return;
        }
        return cart.products;
    }

    // addProductToCart(cid, pid): agregar producto al carrito, incrementando cantidad si ya existe //

    addProductToCart(cid, pid) {
        const cart = this.carts.find((c) => c.id === cid);
        if (!cart) {
            console.log("Carrito no encontrado");
            return;
        }
        const productIndex = cart.products.findIndex((p) => p.id === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
        }
        fs.writeFileSync(pathCart, JSON.stringify(this.carts));
    }
}

module.exports = CartManager;