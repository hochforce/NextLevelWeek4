import { Repository, EntityRepository } from "typeorm"
import { User } from "../models/user";

@EntityRepository(User)
class UsersRepository extends Repository<User> {

}

export { UsersRepository };