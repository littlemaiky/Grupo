const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createVentaSchema, updateVentaSchema, getVentaSchema } = require('./../schemas/ventas.schema');
const VentaService = require ('./../services/ventas.service');
const service = new VentaService();

router.get('/', async (req, res) => {
  const ventas = await service.find();
  res.status(200).json(ventas);
});
//                                              Middlewares
router.get('/:id',
          validatorHandler(getVentaSchema, 'params'),//validamos el ID
          async (req, res, next) => {
  try{ // si yo lanzo el desde el findOne
    const { id } = req.params;
    const venta = await service.findOne(id);//lanzador de error
    res.status(200).json(venta);
  }catch(error){ //aca atrapa el error desde find One
    next(error);//envia el error al siguiente middleware
  }
});

router.post('/',
            validatorHandler(createVentaSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res) => {
  const body = req.body;
  const nuevoVenta = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoVenta
  });
});

router.patch('/:id',
            validatorHandler(getVentaSchema, 'params'),//validamos primero el id
            validatorHandler(updateVentaSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const venta = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      venta
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getVentaSchema, 'params'),
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
