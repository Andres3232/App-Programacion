import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";



interface IUser {
    
    username: string;
    email: string;
    Telefono: string;
    Ciudad: string;
    estado: string;
  }

  interface IUserUpdate {
    id: string
    username: string;
    email: string;
    Telefono: string;
    Ciudad: string;
    estado: string;
  }

class UsuarioService {

  //listar usuarios
    async list() {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const users = await usersRepository.find();
    
        return users;
      }

  //crear usuarios
      async create({ username, email, Telefono, Ciudad, estado }: IUser) {
        if (!username || !email || !Telefono || !Ciudad || !estado) {
          throw new Error("Por favor escribe todo los campos");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const usernameAlreadyExists = await usersRepository.findOne({ username });
    
        if (usernameAlreadyExists) {
          throw new Error("Username ya esta registrado");
        }
    
        const emailAlreadyExists = await usersRepository.findOne({ email });
    
        if (emailAlreadyExists) {
          throw new Error("Email ya esta registrado");
        }
    
        const user = usersRepository.create({ username, email, Telefono, Ciudad, estado });
    
        await usersRepository.save(user);
    
        return user;
      }

  //buscar usuarios
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor preencha o campo de busca");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .where("username like :search", { search: `%${search}%` })
          .orWhere("email like :search", { search: `%${search}%` })
          .orWhere("Telefono like :search", { search: `%${search}%` })
          .orWhere("Ciudad like :search", { search: `%${search}%` })
          .orWhere("estado like :search", { search: `%${search}%` })
          .getMany();
    
        return user;
    
      }


  //traer data del usuario
      async getData(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
      }

      async update({ id, username, email, Telefono, Ciudad, estado }: IUserUpdate) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ username, email, Telefono, Ciudad, estado })
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }


      //deletear
      async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }

}


export { UsuarioService };
