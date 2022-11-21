const { rejects } = require('assert');
const crypto = require('crypto'); //para crear codigos UUID
const boom = require('@hapi/boom');

class clienteService {

  constructor() {
    this.clientes = [];
    this.generate(10);
  }

  generate(limite) {
    for (let index = 0; index < limite; index++) {
      this.clientes.push({
        id: crypto.randomUUID(), //da el ID
        nombre: 'cliente ' + index, //genera los nombres
        DNI: 10000 + Math.floor(Math.random()*190000000000),
        estaBloqueado: Math.random() < 0.25 //valor boolean
      }); //genera DNI aleatorios entre 0 y 1
    }
  }

  create (data) {
    const nuevocliente = {
      id: crypto.randomUUID(), //creo productos y le coloco us ID
      ...data //desempaquetado
    };
    this.clientes.push(nuevocliente);
    return nuevocliente; // devuelvo el nuevo producto en el metodo create
  }

  async find() {
    return this.clientes;
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
    const client =  this.clientes.find(cliente => { //seguarda en la variable insum
      return cliente.id === id;
    }); //!ultizamos la negacición(!) para ver si es no es producto
    if (!client) { //consulta del error
      throw boom.notFound('Producto no encontrado'); //lanza un error boom
    }
    return client; //si no es un error devuelve el insum
  }

  async update(id , changes) {
    const index = this.clientes.findIndex(cliente =>{
      return cliente.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const cliente = this.clientes[index];
    this.clientes[index] = {
      ...cliente,
      ...changes
    };
    return this.clientes[index];
  }

  async delete(id) {
    const index = this.clientes.findIndex(cliente =>{
      return cliente.id === id;
    });
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    this.clientes.splice(index, 1);
    return { id };
  }
}

module.exports = clienteService
