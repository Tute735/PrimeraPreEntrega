import express from 'express';
import CartManager from '../manager/cart.manager.js';
import ProductManager from '../manager/products.manager.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const cartManager = new CartManager('src/carts.json');
const productManager = new ProductManager('src/productos.json');
const saveCarts = async (carts) => {
    await fs.writeFile('carritos.json', JSON.stringify(carts, null, 2), 'utf-8');
  };
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    await cartManager.updateById(cartId, { products: [] });
    res.json({ message: 'Carrito limpiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = {
      id: uuidv4(),
      products: []
    };

    await cartManager.save(newCart);  // Guardar el nuevo carrito

    res.json(newCart);  // Responder con el nuevo carrito
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const carts = await getCarts();
      const cartIndex = carts.findIndex((c) => c.id.toString() === cartId.toString());
  
      if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex(
          (p) => p.product.toString() === productId.toString()
        );
  
        if (productIndex !== -1) {
          // Si el producto ya existe en el carrito, incrementa la cantidad
          carts[cartIndex].products[productIndex].quantity += 1;
        } else {
          // Si el producto no existe, agrégalo al carrito con cantidad 1
          carts[cartIndex].products.push({
            product: productId,
            quantity: 1,
          });
        }
  
        await saveCarts(carts);
        res.json({ message: 'Producto agregado al carrito correctamente', cartId, productId });
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
  });

export default router;
