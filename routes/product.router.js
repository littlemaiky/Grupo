const express = require('express');
const router = express.Router();
const ProductService = require ('./../services/product.service');
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  if (product === undefined) {
    res.status(404).json({
      message: 'product no se encuentra',
      id
    });
  }
  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const nuevoProducto = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoProducto
  });
});

router.patch('/:id',async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  res.status(200).json({
    message: 'actualizado',
    product
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json({
    message: 'eliminado',
    rta
  });
});

module.exports = router;
