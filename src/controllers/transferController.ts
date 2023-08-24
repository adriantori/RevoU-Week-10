import { Request, Response } from 'express';
import { TransferDao } from '../dao/transferDao';
import TransferService from '../services/transferService'; // Update the path as needed
import { ObjectId } from 'mongodb';

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

const patchTransfer = async (req: Request, res: Response) => {
  const transactionIdString: string = req.params.id;
  const status = req.body.status.toLowerCase();

  if (status !== 'approved' && status !== 'rejected') {
    return res.status(400).json({
      message: 'error',
      error: 'Invalid status. Status must be either "approved" or "rejected".'
    });
  }

  try {
    const transactionId = new ObjectId(transactionIdString);
    const transferDao = new TransferDao(req.db);
    const transferService = new TransferService(transferDao);
    
    const transfer = await transferService.updateTransfer(transactionId, status);
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

const deleteTransfer = async (req: Request, res: Response) => {
  const transactionIdString: string = req.params.id;

  try {
    const transactionId = new ObjectId(transactionIdString);
    const transferDao = new TransferDao(req.db);
    const transferService = new TransferService(transferDao);
    
    const transfer = await transferService.deleteTransfer(transactionId);
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

export { createTransfer, getAllTransfers, patchTransfer, deleteTransfer };
