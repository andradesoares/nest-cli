import { User } from '../../user/user.entity';

export default class Util {
  static createUser(): User {
    const user = new User();

    user.email = 'test@test.com';
    user.password = '1234';
    user.name = 'Test';
    user.id = '1';

    return user;
  }
}
