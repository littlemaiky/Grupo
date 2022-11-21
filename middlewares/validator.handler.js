const boom = require('@hapi/boom');
const { json } = require('express');
//creamos un metodo llamado validatorHAndler
function validatorHandler(schema, property) {//y una propiedad para poder extraer del req el valor de la propiedad
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, {//va a buscar un error  ue valide con la data
      abortEarly: false
    });
    if (error) {
      next(boom.badRequest(error));//si contiene el error
    }
    next(); //no contiene el error
  };
}

module.exports = validatorHandler;
