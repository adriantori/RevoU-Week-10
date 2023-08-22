import { Db } from 'mongodb';

class TransferDao {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createTransfer(amount: number, currency: string, sourceAccount: number, destinationAccount: number): Promise<any> {
    try {
      const user = await this.db.collection('transfer').insertOne({ amount, currency, sourceAccount, destinationAccount, status:"pending" });
      return user;
    } catch (error: any) {
      throw new Error('Error creating transfer: ' + error.message);
    }
  }

  async getAllTransfer(): Promise<any> {
    try {
      const user = await this.db.collection('transfer').find().toArray();
      return user
    } catch (error: any) {
      throw new Error('Error getting any transfer:' + error.message)
    }
  }
}

export { TransferDao };
