const Joi = require('joi');
//creacion de los campos que vamos a validar
const id = Joi.string()
              .uuid();//campo id
const nombre = Joi.string() //valor
                  .alphanum()
                  .min(8)
                  .max(20);
const DNI = Joi.number() //valor
                  .integer()
                  .min(2);

const createTrabajadorSchema = Joi.object({
  nombre: nombre.required(),//etiqueta < >Valor
  DNI: DNI.required()
});
//creación de los objetos de validación, los esquemas
const updateTrabajadorSchema = Joi.object({
  nombre: nombre,
  DNI: DNI
});

const getTrabajadorSchema = Joi.object({
  id: id.required()
});

module.exports = { createTrabajadorSchema, updateTrabajadorSchema, getTrabajadorSchema };
