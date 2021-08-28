import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, Telefono, Ciudad, estado } = request.body;

    const createUserService = new CreateUserService();

    try {
      await createUserService.create({
        username,
        email,
        Telefono,
        Ciudad,
        estado
      }).then(() => {
        response.render("message", {
          message: "Usuario creado con exito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al crear el usuario: ${err.message}`
      });
    }

  }
}

export { CreateUserController };