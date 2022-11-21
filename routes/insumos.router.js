const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createInsumoSchema, updateInsumoSchema, getInsumoSchema } = require('./../schemas/insumos.schema');
const InsumoService = require ('./../services/insumos.service');
const service = new InsumoService();

router.get('/', async (req, res) => {
  const insumos = await service.find();
  res.status(200).json(insumos);
});
//                                              Middlewares
router.get('/:id',
          validatorHandler(getInsumoSchema, 'params'),//validamos el ID
          async (req, res, next) => {
  try{ // si yo lanzo el desde el findOne
    const { id } = req.params;
    const insumo = await service.findOne(id);//lanzador de error
    res.status(200).json(insumo);
  }catch(error){ //aca atrapa el error desde find One
    next(error);//envia el error al siguiente middleware
  }
});

router.post('/',
            validatorHandler(createInsumoSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res) => {
  const body = req.body;
  const nuevoInsumo = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoInsumo
  });
});

router.patch('/:id',
            validatorHandler(getInsumoSchema, 'params'),//validamos primero el id
            validatorHandler(updateInsumoSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const insumo = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      insumo
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getInsumoSchema, 'params'),
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
