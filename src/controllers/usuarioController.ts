
import { Request, Response } from "express";

import { UsuarioService } from "../services/usuarioService"

class UsuarioController {
     
    //metodo para listar usuarios
    async listUsers(request: Request, response: Response) {
        const listUsersService = new UsuarioService();
    
        const users = await listUsersService.list();
    
        return response.render("index", {
          users: users
        });
      }

      //metodo para agregar usuario
      async createUser(request: Request, response: Response) {
        const { username, email, Telefono, Ciudad, estado } = request.body;
    
        const createUserService = new UsuarioService();
    
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

      //metodo para buscar usuario
      async searchUser(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchUserService = new UsuarioService();
    
        try {
          const users = await searchUserService.search(search);
          response.render("search", {
            users: users,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar el usuario: ${err.message}`
          });
        }
      }

      //traer la data del usuario
      async getUserData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new UsuarioService();
    
        const user = await getUserDataService.getData(id);
    
        return response.render("edit", {
          user: user
        });
      }

      //editar el usuario
      async updateUser(request: Request, response: Response) {
        const { id, username, email, Telefono, Ciudad, estado } = request.body;
    
        const updateUserService = new UsuarioService();
    
        try {
          await updateUserService.update({ id, username, email, Telefono, Ciudad, estado }).then(() => {
            response.render("message", {
              message: "Usuario actualizado"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al actualizar el usuario: ${err.message}`
          });
        }
    
      }


      //borrar usuario
      async deleteUser(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UsuarioService();
    
        try {
          await deleteUserService.delete(id).then(() => {
            response.render("message", {
              message: "Usuario eliminado"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar el usuario: ${err.message}`
          });
        }
      }



    
}
export  { UsuarioController };
