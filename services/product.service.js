const { reject } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const { resolve } = require('path');

class productService {

  constructor() {
    this.products = [];
    this.generate(5);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.products.push({
        id: crypto.randomUUID(), //da el ID
        nombre: 'producto ' + index, //genera los nombres
        precio: 10 + Math.floor(Math.random()*190)
      }); //genera precios
    }
  }

  create (data) {
    const nuevoProducto = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    this.products.push(nuevoProducto);
    return nuevoProducto; // devuelvo el nuevo producto en el metodo create
  }

  find() {
    //return this.products;
    //setTimeout (() => {
    //  return this.products;
    //}, 3000);
    return new Promise((resolve, reject) => { //determina el tiempo de ejecución
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  findOne(id) { //devuelve 1
    return this.products.find(product => { //devolver el producto que haga math
      return product.id === id;
    });
  }

  update(id , changes) {
    const index = this.products.findIndex(product =>{
      return product.id === id;
    });
    if (index === -1) {
      throw new Error('El producto no funciona');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(product =>{
      return product.id === id;
    });
    if (index === -1) {
      throw new Error('El producto no funciona');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = productService
