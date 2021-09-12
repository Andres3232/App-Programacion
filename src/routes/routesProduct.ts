import { Router } from 'express';
import { ProductController } from '../controllers/productoControllers';





const router = Router();


const productoController = new ProductController()




  router.get("/lista-producto", productoController.listProducts)