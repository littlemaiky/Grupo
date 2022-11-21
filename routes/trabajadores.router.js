const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createTrabajadorSchema, updateTrabajadorSchema, getTrabajadorSchema } = require('./../schemas/trabajadores.schema');
const TrabajadorService = require ('./../services/trabajadores.service');
const service = new TrabajadorService();

router.get('/', async (req, res) => {
  const trabajadores = await service.find();
  res.status(200).json(trabajadores);
});
//                                              Middlewares
router.get('/:id',
          validatorHandler(getTrabajadorSchema, 'params'),//validamos el ID
          async (req, res, next) => {
  try{ // si yo lanzo el desde el findOne
    const { id } = req.params;
    const trabajador = await service.findOne(id);//lanzador de error
    res.status(200).json(trabajador);
  }catch(error){ //aca atrapa el error desde find One
    next(error);//envia el error al siguiente middleware
  }
});

router.post('/',
            validatorHandler(createTrabajadorSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res) => {
  const body = req.body;
  const nuevoTrabajador = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoTrabajador
  });
});

router.patch('/:id',
            validatorHandler(getTrabajadorSchema, 'params'),//validamos primero el id
            validatorHandler(updateTrabajadorSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const trabajador = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      trabajador
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getTrabajadorSchema, 'params'),
              async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json({
      message: 'eliminado',
      rta
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
