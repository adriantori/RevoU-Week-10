import { Db } from 'mongodb';

class AuthDao {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async registerUser(username: string, role: string, password: string): Promise<any> {
    try {
      const user = await this.db.collection('users').insertOne({ username, role, password });
      return user;
    } catch (error: any) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async getAllUser(): Promise<any> {
    try {
      const user = await this.db.collection('users').find().toArray();
      return user
    } catch (error: any) {
      throw new Error('Error getting any user:' + error.message)
    }
  }

  async loginUser(username: string):Promise<any> {
    try {
      const user = await this.db.collection('users').findOne({ username });
      return user
    } catch (error: any) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
}

export { AuthDao };
