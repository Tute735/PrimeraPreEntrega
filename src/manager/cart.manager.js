// import { promises as fs } from 'fs';

// export default class CartManager {

//   constructor(ruta) {
//     this.ruta = ruta;
//   }

//   async getById(id) {
//     try {
//       const carts = await this.getData();
//       const cart = carts.find(cart => cart.id === id);
//       if (!cart) {
//         throw new Error('Carrito no encontrado');
//       }
//       return cart;
//     } catch (error) {
//       throw new Error('Error al obtener el carrito');
//     }
//   }

//   async save(cart) {
//     try {
//       await this.writeData(cart);
//       return cart;
//     } catch (error) {
//       throw new Error(`Error al guardar el carrito: ${error.message}`);
//     }
//   }
  

//   async clear() {
//     try {
//       await this.writeData([]);
//     } catch (error) {
//       throw new Error('Error al limpiar el carrito');
//     }
//   }

//   async getData() {
//     try {
//       const carts = await fs.readFile(this.ruta, 'utf-8');
//       return JSON.parse(carts);
//     } catch (error) {
//       throw new Error('Error al obtener los carritos'); // Cambiado de return [] a throw
//     }
//   }
  

//   async writeData(data) {
//     try {
//       await fs.writeFile(this.ruta, JSON.stringify(data, null, 2), 'utf-8');
//     } catch (error) {
//       throw new Error('Error al escribir los datos');
//     }
//   }
  
//   async updateById(id, updatedFields) {
//     try {
//       const carts = await this.getData();
//       const cartIndex = carts.findIndex(c => c.id === id);
  
//       if (cartIndex === -1) {
//         throw new Error('Carrito no encontrado');
//       }
  
//       const updatedCart = {
//         ...carts[cartIndex],
//         ...updatedFields
//       };
  
//       carts[cartIndex] = updatedCart;
//       await this.writeData(carts);
  
//       return updatedCart;
//     } catch (error) {
//       throw new Error('Error al actualizar el carrito');
//     }
//   }
  
//   }
  




import { promises as fs } from 'fs';

export default class cartManager {


  
  constructor(ruta) {
    this.ruta = ruta;
  }
    async getData() {
    try {
      const carts = await fs.readFile(this.ruta, 'utf-8');
      console.log(carts)
      return JSON.parse(carts);
    } catch (error) {
      throw new Error('Error al obtener los carritos'); 
    }
  }

  async getById(id) {
    try {
      const carts = await this.getData();
      const cart = carts.find(cart => cart.id == id);
      console.log(Array.isArray(carts))
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async save(cart) {
    try {
      await this.writeData(cart);
      return cart;
    } catch (error) {
      throw new Error(`Error al guardar el carrito: ${error.message}`);
    }
  }
  

  async clear() {
    try {
      await this.writeData([]);
    } catch (error) {
      throw new Error('Error al limpiar el carrito');
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
      const carts = await this.getData();
      const cartIndex = carts.findIndex(c => c.id == id);
  
      if (cartIndex === -1) {
        throw new Error('Carrito no encontrado');
      }
  
      const updatedCart = {
        ...carts[cartIndex],
        ...updatedFields
      };
  
      carts[cartIndex] = updatedCart;
      await this.writeData(carts);
  
     return updatedCart;
   } catch (error) {
     throw new Error('Error al actualizar el carrito');
  }
   }
  
  }
