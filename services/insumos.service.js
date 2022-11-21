const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');

class insumoService {

  constructor() {
    this.insumos = [];
    this.generate(10);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.insumos.push({
        id: crypto.randomUUID(), //da el ID
        nombre: 'cliente ' + index, //genera los nombres
        DNI: 10000 + Math.floor(Math.random()*190000000000),
        estaBloqueado: Math.random() < 0.25 //valor boolean
      }); //genera DNI aleatorios entre 0 y 1
    }
  }

  create (data) {
    const nuevoinsumo = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    this.insumos.push(nuevoinsumo);
    return nuevoinsumo; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    return this.insumos;
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
    const insum =  this.insumos.find(insumo => { //seguarda en la variable insum
      return insumo.id === id;
    }); //!ultizamos la negacición(!) para ver si es no es producto
    if (!insum) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return insum; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const index = this.insumos.findIndex(insumo =>{
      return insumo.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const insumo = this.insumos[index];
    this.insumos[index] = {
      ...insumo,
      ...changes
    };
    return this.insumos[index];
  }

  async delete(id) {
    const index = this.insumos.findIndex(insumo =>{
      return insumo.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    this.insumos.splice(index, 1);
    return { id };
  }
}

module.exports = insumoService
