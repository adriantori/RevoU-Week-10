import { Request, Response } from 'express';
import { TransferDao } from '../dao/transferDao';

const createTransfer = async (req: Request, res: Response) => {
  const { amount, currency, sourceAccount, destinationAccount } = req.body;

  try {
    const transferDao = new TransferDao(req.db); // Create authDao instance with the request's db reference

    const user = await transferDao.createTransfer(amount, currency, sourceAccount, destinationAccount);
    res.status(200).json({
      message: 'success',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

const getAllTransfer = async (req: Request, res: Response) => {
  try {
    const transferDao = new TransferDao(req.db); // Create authDao instance with the request's db reference

    const user = await transferDao.getAllTransfer();
    res.status(200).json({
      message: 'success',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

export { createTransfer, getAllTransfer };
