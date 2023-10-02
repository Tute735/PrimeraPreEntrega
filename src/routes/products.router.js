// products.router.js
import express from 'express';
import ProductManager from '../manager/products.manager.js';

const router = express.Router();
const productManager = new ProductManager('src/productos.json');

// Ruta para listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;

    const updatedProduct = await productManager.updateById(productId, updatedFields);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.save(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    await productManager.deleteById(productId);
    res.json({ message: `Producto con ID ${productId} eliminado exitosamente.` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
