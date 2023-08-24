import { ObjectId } from 'mongodb';
import { TransferDao } from '../dao/transferDao';

class TransferService {
  private transferDao: TransferDao;

  constructor(transferDao: TransferDao) {
    this.transferDao = transferDao;
  }

  async createTransfer(amount: number, currency: string, sourceAccount: string, destinationAccount: string) {
    return await this.transferDao.createTransfer(amount, currency, sourceAccount, destinationAccount);
  }

  async getAllTransfers() {
    return await this.transferDao.getAllTransfer();
  }

  async updateTransfer(transactionId: ObjectId, status: string){
    return await this.transferDao.updateTransfer(transactionId, status);
  }

  async deleteTransfer(transactionId: ObjectId){
    return await this.transferDao.deleteTransfer(transactionId);
  }
}

export default TransferService;
