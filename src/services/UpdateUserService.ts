import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  id: string
  username: string;
  email: string;
  Telefono: string;
  Ciudad: string;
  estado: string;
}

class UpdateUserService {
  async update({ id, username, email, Telefono, Ciudad, estado }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, email, Telefono, Ciudad, estado })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UpdateUserService };