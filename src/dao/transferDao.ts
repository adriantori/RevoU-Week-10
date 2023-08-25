import { Db, ObjectId } from 'mongodb';

class TransferDao {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  formatDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async createTransfer(amount: number, currency: string, sourceAccount: string, destinationAccount: string): Promise<any> {
    try {
      const currentDate = this.formatDate();


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
      const user = await this.db.collection('transfer').find({ isDeleted: { $exists: false } }).toArray();
      return user
    } catch (error: any) {
      throw new Error('Error getting any transfer:' + error.message)
    }
  }

  async updateTransfer(transferId: ObjectId, status: string): Promise<any> {
    try {
      const currentDate = this.formatDate();
      const user = await this.db.collection('transfer').updateOne(
        { _id: transferId },
        {
          $set: {
            status,
            updatedAt: currentDate
          }
        }
      );
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

  async getHistory(startDate?: string, endDate?: string, statusArray?: string[]): Promise<any[]> {
    try {
      const query: any = {};

      if (startDate) query.createdAt = { $gte: startDate };
      if (endDate) query.createdAt = { $lte: endDate };
      if (statusArray && statusArray.length > 0) query.status = { $in: statusArray };

      const user = await this.db.collection('transfer').find(query).toArray();
      return user;
    } catch (error: any) {
      throw new Error('Error getting transfer history: ' + error.message);
    }
  }
}

export { TransferDao };
