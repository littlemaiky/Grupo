const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');//extraemos los modelos

class insumoService {

  constructor() {
    this.insumos = [];
    this.generate(10);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.insumos.push({
        id: crypto.randomUUID(), //da el ID
        insumo: 'insumo ' + index, //genera los nombres
        codigo: 10000 + Math.floor(Math.random()*190000000000),
        //estaBloqueado: Math.random() < 0.25 //valor boolean
      }); //genera DNI aleatorios entre 0 y 1
    }
  }

  async create (data) {
    const nuevoInsumo = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    const salida = await models.Insumo.create(nuevoInsumo);
    return salida; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    const salida = await models.Insumo.findAll();
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
    const insum = await models.Insumo.findByPk(id);
    if (!insum) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return insum;
//    const insum =  this.insumos.find(insumo => { //seguarda en la variable insum
//      return insumo.id === id;
//    }); //!ultizamos la negacición(!) para ver si es no es producto
//    if (!insum) { //consulta del error
//      throw boom.notFound('Producto no encontrado'); //lanza un error boom
//    }
//    return insum; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const insum = await this.findOne(id);
    const salida = await insum.update(changes);
    return salida;
//    const index = this.insumos.findIndex(insumo =>{
//      return insumo.id === id;
//    });
//    if (index === -1) {
//      throw boom.notFound('Producto no encontrado');
//    }
//    const insumo = this.insumos[index];
//    this.insumos[index] = {
//      ...insumo,
//      ...changes
//    };
//    return this.insumos[index];
  }

  async delete(id) {
    const insum = await this.findOne(id);
    await insum.destroy();
    return { id };
//    const index = this.insumos.findIndex(insumo =>{
//      return insumo.id === id;
//    });
//    if (index === -1) {
//      throw boom.notFound('Producto no encontrado');
//    }
//    this.insumos.splice(index, 1);
//    return { id };
  }
}

module.exports = insumoService
