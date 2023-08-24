import { Request, Response } from 'express';
import { TransferDao } from '../dao/transferDao';
import TransferService from '../services/transferService'; // Update the path as needed

const createTransfer = async (req: Request, res: Response) => {
  const { amount, currency, sourceAccount, destinationAccount } = req.body;

  try {
    const transferDao = new TransferDao(req.db);
    const transferService = new TransferService(transferDao);
    
    const transfer = await transferService.createTransfer(amount, currency, sourceAccount, destinationAccount);
    res.status(200).json({
      message: 'success',
      data: transfer
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

const getAllTransfers = async (req: Request, res: Response) => {
  try {
    const transferDao = new TransferDao(req.db);
    const transferService = new TransferService(transferDao);

    const transfers = await transferService.getAllTransfers();
    res.status(200).json({
      message: 'success',
      data: transfers
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

export { createTransfer, getAllTransfers };
