const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');

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

  create (data) {
    const nuevopaqueteria = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    this.paqueterias.push(nuevopaqueteria);
    return nuevopaqueteria; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    return this.paqueterias;
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
    const paquet =  this.paqueterias.find(paqueteria => { //seguarda en la variable insum
      return paqueteria.id === id;
    }); //!ultizamos la negacición(!) para ver si es no es producto
    if (!paquet) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return paquet; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const index = this.paqueterias.findIndex(paqueteria =>{
      return paqueteria.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const paqueteria = this.paqueterias[index];
    this.paqueterias[index] = {
      ...paqueteria,
      ...changes
    };
    return this.paqueterias[index];
  }

  async delete(id) {
    const index = this.paqueterias.findIndex(paqueteria =>{
      return paqueteria.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    this.paqueterias.splice(index, 1);
    return { id };
  }
}

module.exports = paqueteriaService
