import { Router } from 'express';
import { ProductController } from '../controllers/productoControllers';
import { validarJWT } from '../middlewares/validar-jwt';
import { esAdminRole } from '../middlewares/validar-roles';




const routerProduct = Router();


const productoController = new ProductController()

routerProduct.get("/add-producto",validarJWT,esAdminRole, productoController.searchCategory);


routerProduct.get("/lista-producto",productoController.listProducts)

routerProduct.post("/add-producto",validarJWT,esAdminRole,productoController.createProduct)


routerProduct.get("/edit-producto",validarJWT,esAdminRole,productoController.getProductData)
routerProduct.post("/edit-product",validarJWT,esAdminRole,productoController.updateProduct)

routerProduct.post("/delete-producto",validarJWT,esAdminRole,productoController.deleteProduct)

export { routerProduct };
  