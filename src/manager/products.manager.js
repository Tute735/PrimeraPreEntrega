
import { promises as fs } from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
  }

 

  async getById(id) {
    const products = await this.getAll();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async getAll() {
    try {
      const products = await fs.readFile(this.ruta, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const updatedProducts = products.filter(p => p.id !== id);
      await this.writeData(updatedProducts);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }

  async deleteAll() {
    try {
      await this.writeData([]);
    } catch (error) {
      throw new Error('Error al eliminar todos los productos');
    }
  }

  async writeData(data) {
    try {
      await fs.writeFile(this.ruta, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw new Error('Error al escribir los datos');
    }
  }

  async updateById(id, updatedFields) {
    try {
      const products = await this.getAll();
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        throw new Error('Producto no encontrado');
      }

      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields
      };

      products[productIndex] = updatedProduct;
      await this.writeData(products);

      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

}