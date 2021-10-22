import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";


const router = Router();

const usuarioController = new UsuarioController();



router.get("/add", (request, response) => {
  response.render("add");
});

router.get("/lista",usuarioController.listUsers)

router.post("/add-user", usuarioController.createUser);

router.get("/search",usuarioController.searchUser);

router.get("/edit", usuarioController.getUserData);

router.post("/edit-user", usuarioController.updateUser);

router.post("/delete-user", usuarioController.deleteUser);

export { router };
