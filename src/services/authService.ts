import { AuthDao } from '../dao/authDao';
import bcrypt from 'bcrypt';

class AuthService {
  private authDao: AuthDao;

  constructor(authDao: AuthDao) {
    this.authDao = authDao;
  }

  async registerUser(username: string, role: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.authDao.registerUser(username, role, hashedPassword);
  }

  async getAllUsers() {
    return await this.authDao.getAllUser();
  }

  async loginUser(username: string, password: string) {
    try {
      const user = await this.authDao.loginUser(username);

      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          return user
        }
      }
      return null;
    } catch (error: any) {
      throw new Error("login error: " + error.message);
    }

  }
}

export default AuthService;
