import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { UsuarioController } from "../controllers/usuarioController";






const routerCategory = Router();
const categoryController = new CategoryController()

routerCategory.get("/lista-categoria",categoryController.listCategories)


export { routerCategory };
