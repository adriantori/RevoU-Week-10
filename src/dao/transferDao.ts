import { Db, ObjectId } from 'mongodb';

class TransferDao {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createTransfer(amount: number, currency: string, sourceAccount: string, destinationAccount: string): Promise<any> {
    try {
      const currentDate = new Date();

      const transferData = {
        amount,
        currency,
        sourceAccount,
        destinationAccount,
        status: "pending",
        createdAt: currentDate
      };
      const user = await this.db.collection('transfer').insertOne(transferData);
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
      const currentDate = new Date();
      const user = await this.db.collection('transfer').updateOne({ _id: transferId }, { $set: { status: status, updatedAt: currentDate } });
      return user;
    } catch (error: any) {
      throw new Error('Error updating data:' + error.message);
    }
  }

  async deleteTransfer(transferId: ObjectId): Promise<any> {
    try {
      const user = await this.db.collection('transfer').updateOne({ _id: transferId }, { $set: { isDeleted: "true" } });
      return user;
    } catch (error: any) {
      throw new Error('Error updating data:' + error.message);
    }
  }

  async getHistory(startDate?: string, endDate?: string, statuses?: string[]): Promise<any[]> {
    try {
      const query: any = {};

      if (startDate) query.startDate = { $gte: new Date(startDate) };
      if (endDate) query.endDate = { $lte: new Date(endDate) };
      if (statuses && statuses.length > 0) query.status = { $in: statuses };

      const user = await this.db.collection('transfer').find(query).toArray();
      return user;
    } catch (error: any) {
      throw new Error('Error getting transfer history: ' + error.message);
    }
  }
}

export { TransferDao };
