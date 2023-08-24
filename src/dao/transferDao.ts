import { Db, ObjectId } from 'mongodb';

class TransferDao {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createTransfer(amount: number, currency: string, sourceAccount: string, destinationAccount: string): Promise<any> {
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

  async updateTransfer(transferId: ObjectId, status: string): Promise<any> {
    try {
      const user = await this.db.collection('transfer').updateOne({ _id: transferId}, {$set: {status: status}});
      return user;
    } catch (error: any) {
      throw new Error('Error updating data:' + error.message);
    }
  }
  
  async deleteTransfer(transferId: ObjectId): Promise<any> {
    try {
      const user = await this.db.collection('transfer').updateOne({ _id: transferId}, {$set: {isDeleted: "true"}});
      return user;
    } catch (error: any) {
      throw new Error('Error updating data:' + error.message);
    }
  }
}

export { TransferDao };
