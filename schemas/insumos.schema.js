const Joi = require('joi');
//creacion de los campos que vamos a validar
const id = Joi.string()
              .uuid();//campo id
const insumm = Joi.string() //valor
                  .min(8)
                  .max(20);
const codigo = Joi.number() //valor
                  .integer()
                  .min(2);

const createInsumoSchema = Joi.object({
  insumm: insumm.required(),//etiqueta < >Valor
  codigo: codigo.required()
});
//creación de los objetos de validación, los esquemas
const updateInsumoSchema = Joi.object({
  insumm: insumm,
  codigo: codigo
});

const getInsumoSchema = Joi.object({
  id: id.required()
});

module.exports = { createInsumoSchema, updateInsumoSchema, getInsumoSchema };
