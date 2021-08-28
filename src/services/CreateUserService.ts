import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  username: string;
  email: string;
  Telefono: string;
  Ciudad: string;
  estado: string;
}

class CreateUserService {
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
}

export { CreateUserService };