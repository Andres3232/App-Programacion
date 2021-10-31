import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { UsuarioController } from "../controllers/usuarioController";
import { validarJWT } from '../middlewares/validar-jwt';
import { esAdminRole } from '../middlewares/validar-roles';
const routerCategory = Router();
const categoryController = new CategoryController()

routerCategory.get("/add-categoria", (request, response) => {
    response.render("add-categoria");
});

routerCategory.get("/lista-categoria",categoryController.listCategories)

routerCategory.post("/add-categoria",validarJWT,esAdminRole,categoryController.createCategory)

routerCategory.get("/edit-categoria",validarJWT,esAdminRole,categoryController.getCategoryData)
routerCategory.post("/edit-category",validarJWT,esAdminRole,categoryController.updateCategory)

routerCategory.post("/delete-categoria",validarJWT,esAdminRole,categoryController.deleteCategory)


export { routerCategory };
