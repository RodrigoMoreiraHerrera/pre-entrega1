const ProductManager = require('./ProductManager.js');
const CartManager = require('./CartManager.js');

const cartManager = new CartManager();
const products = cartManager.getCartById(1);
const productManager = new ProductManager();
const product = productManager.getProducts();
console.log(products, product);