const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class paqueteriaService {

  constructor() {
    this.paqueterias = [];
    this.generate(10);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.paqueterias.push({
        id: crypto.randomUUID(), //da el ID
        nombre: 'cliente ' + index, //genera los nombres
        cantidad: 1 + Math.floor(Math.random()*190),
        estaBloqueado: Math.random() < 0.25 //valor boolean
      }); //genera DNI aleatorios entre 0 y 1
    }
  }

  async create (data) {
    const nuevoPaqueteria = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    const salida = await models.Paqueteria.create(nuevoPaqueteria);
    return salida; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    const salida = await models.Paqueteria.findAll();
    return salida;
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
    const paquet = await models.Paqueteria.findByPk(id);
    if (!paquet) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return paquet;
//    const paquet =  this.paqueterias.find(paqueteria => { //seguarda en la variable insum
//      return paqueteria.id === id;
//    }); //!ultizamos la negacición(!) para ver si es no es producto
//    if (!paquet) { //consulta del error
//      throw boom.notFound('Producto no encontrado'); //lanza un error boom
//    }
//    return paquet; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const paquet = await this.findOne(id);
    const salida = await paquet.update(changes);
    return salida;
//    const index = this.paqueterias.findIndex(paqueteria =>{
//      return paqueteria.id === id;
//    });
//    if (index === -1) {
//      throw boom.notFound('Producto no encontrado');
//    }
//    const paqueteria = this.paqueterias[index];
//    this.paqueterias[index] = {
//      ...paqueteria,
//      ...changes
//    };
//    return this.paqueterias[index];
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
//    const index = this.paqueterias.findIndex(paqueteria =>{
//      return paqueteria.id === id;
//    });
//    if (index === -1) {
//      throw boom.notFound('Producto no encontrado');
//    }
//    this.paqueterias.splice(index, 1);
//    return { id };
  }
}

module.exports = paqueteriaService
