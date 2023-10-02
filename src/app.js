import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());

app.listen(8080, () => console.log('listening on port 8080'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
