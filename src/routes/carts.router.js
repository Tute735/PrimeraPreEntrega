
 import express from "express";
 import CartManager from "../manager/cart.manager.js";
 import ProductManager from "../manager/products.manager.js";
 import { v4 as uuidv4 } from "uuid";
 const router = express.Router();
 const cartManager = new CartManager("src/carts.json");
 const productManager = new ProductManager("src/productos.json");

 router.get("/:cid", async (req, res) => {
   try {
     const cartId = req.params.cid;
     console.log(cartId)
     const cart = await cartManager.getById(cartId);
     res.json(cart);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });

 router.post("/", async (req, res) => {
   try {
     const newCart = {
       id: uuidv4(),
       products: [],
     };

     await cartManager.save(newCart); // Guardar el nuevo carrito

     res.json(newCart); // Responder con el nuevo carrito
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 });

 router.post("/:cid/product/:pid", async (req, res) => {
   try {
     const cartId = req.params.cid;
     const productId = req.params.pid;
     console.log("cartId:", cartId);
      console.log("productId:", productId);
     const quantity = parseInt(req.body.quantity);
     console.log(productId)

     const cart = await cartManager.getById(cartId);
     const product = await productManager.getById(productId);
     console.log("Product:", product);
     if (!cart || !product) {
       throw new Error("Carrito o producto no encontrado");
     }

     const newCartItem = {
       product: productId,
       quantity: quantity || 1,
     };

     cart.products.push(newCartItem);
     await cartManager.updateById(cartId, { products: cart.products });

     res.json(cart);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 });

 export default router;




