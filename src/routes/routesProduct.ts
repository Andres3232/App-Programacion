import { Router } from 'express';
import { ProductController } from '../controllers/productoControllers';





const router1 = Router();


const productoController = new ProductController()




router1.get("/lista-producto", productoController.listProducts)

export { router1 };
  