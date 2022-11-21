const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');

class ventaService {

  constructor() {
    this.ventas = [];
    this.generate(10);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.ventas.push({
        id: crypto.randomUUID(), //da el ID
        nombre: 'cliente ' + index, //genera los nombres
        cantidad: 1 + Math.floor(Math.random()*190),
        estaBloqueado: Math.random() < 0.25 //valor boolean
      }); //genera DNI aleatorios entre 0 y 1
    }
  }

  create (data) {
    const nuevoventa = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    this.ventas.push(nuevoventa);
    return nuevoventa; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    return this.ventas;
    //
    //
    //
    //
    //
    //
    //
    //
  }

  async findOne(id) {
    const vent =  this.ventas.find(venta => { //seguarda en la variable insum
      return venta.id === id;
    }); //!ultizamos la negacición(!) para ver si es no es producto
    if (!vent) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return vent; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const venta = this.ventas[index];
    this.ventas[index] = {
      ...venta,
      ...changes
    };
    return this.ventas[index];
  }

  async delete(id) {
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    this.ventas.splice(index, 1);
    return { id };
  }
}

module.exports = ventaService
