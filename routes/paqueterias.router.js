const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createPaqueteriaSchema, updatePaqueteriaSchema, getPaqueteriaSchema } = require('./../schemas/paqueterias.schemas');
const PaqueteriaService = require ('./../services/paqueterias.service');
const service = new PaqueteriaService();

router.get('/', async (req, res) => {
  const Paqueterias = await service.find();
  res.status(200).json(Paqueterias);
});
//                                              Middlewares
router.get('/:id',
          validatorHandler(getPaqueteriaSchema, 'params'),//validamos el ID
          async (req, res, next) => {
  try{ // si yo lanzo el desde el findOne
    const { id } = req.params;
    const paqueteria = await service.findOne(id);//lanzador de error
    res.status(200).json(paqueteria);
  }catch(error){ //aca atrapa el error desde find One
    next(error);//envia el error al siguiente middleware
  }
});

router.post('/',
            validatorHandler(createPaqueteriaSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res) => {
  const body = req.body;
  const nuevoPaqueteria = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoPaqueteria
  });
});

router.patch('/:id',
            validatorHandler(getPaqueteriaSchema, 'params'),//validamos primero el id
            validatorHandler(updatePaqueteriaSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const paqueteria = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      paqueteria
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getPaqueteriaSchema, 'params'),
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
