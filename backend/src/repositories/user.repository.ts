import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from '../utils/password.utils';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password, isLocationOwner } = createUserDto;

    const hashedPassword = await hashPassword(password);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
      isLocationOwner,
    });

    await this.save(user);

    return user;
  }
}
