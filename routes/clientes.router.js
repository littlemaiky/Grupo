const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createClienteSchema, updateClienteSchema, getClienteSchema } = require('./../schemas/clientes.schema');
const ClienteService = require ('./../services/clientes.service');
const service = new ClienteService();

router.get('/', async (req, res) => {
  const clientes = await service.find();
  res.status(200).json(clientes);
});
//                                              Middlewares
router.get('/:id',
          validatorHandler(getClienteSchema, 'params'),//validamos el ID
          async (req, res, next) => {
  try{ // si yo lanzo el desde el findOne
    const { id } = req.params;
    const cliente = await service.findOne(id);//lanzador de error
    res.status(200).json(cliente);
  }catch(error){ //aca atrapa el error desde find One
    next(error);//envia el error al siguiente middleware
  }
});

router.post('/',
            validatorHandler(createClienteSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res) => {
  const body = req.body;
  const nuevoCliente = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoCliente
  });
});

router.patch('/:id',
            validatorHandler(getClienteSchema, 'params'),//validamos primero el id
            validatorHandler(updateClienteSchema, 'body'),//validamos que los datos que vamos a ingresar esten bien
            async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const cliente = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      cliente
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getClienteSchema, 'params'),
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
