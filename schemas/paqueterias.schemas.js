const Joi = require('joi');
//creacion de los campos que vamos a validar
const id = Joi.string()
              .uuid();//campo id
const nombre = Joi.string() //valor
                  .min(8)
                  .max(20);
const cantidad = Joi.number() //valor
                  .integer()
                  .min(2);

const createPaqueteriaSchema = Joi.object({
  nombre: nombre.required(),//etiqueta < >Valor
  cantidad: cantidad.required()
});
//creación de los objetos de validación, los esquemas
const updatePaqueteriaSchema = Joi.object({
  nombre: nombre,
  cantidad: cantidad
});

const getPaqueteriaSchema = Joi.object({
  id: id.required()
});

module.exports = { createPaqueteriaSchema, updatePaqueteriaSchema, getPaqueteriaSchema };
