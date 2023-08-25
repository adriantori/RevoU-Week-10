import { MongoClient, Db } from 'mongodb';

class MongoConnection {
  private static client: MongoClient;
  private static db: Db;

  static async connect(uri: string, dbName: string): Promise<void> {
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);
  }

  static getDb(): Db {
    if (!this.db) {
      throw new Error('Database connection not established.');
    }
    return this.db;
  }
}

export { MongoConnection };
