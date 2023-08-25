import { Request, Response } from 'express';
import TransferService from '../../../services/transferService';
import { createTransfer } from '../../../controllers/transferController';

// Mocks
jest.mock('../../../services/transferService');
jest.mock('mongodb'); // Mock the ObjectId if needed

describe('createTransfer function', () => {
  const mockRequest = (body: any) => ({ body }) as Request;
  const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transfer', async () => {
    const req = mockRequest({
      amount: 100,
      currency: 'USD',
      sourceAccount: 'source-account-id',
      destinationAccount: 'destination-account-id'
    });
    const res = mockResponse();

    // Mock TransferService's createTransfer to return a transfer object
    (TransferService.prototype.createTransfer as jest.Mock).mockResolvedValue({
      // Define the properties of the transfer object here
      id: 'transfer-id',
      amount: 100,
      currency: 'USD',
      sourceAccount: 'source-account-id',
      destinationAccount: 'destination-account-id'
    });

    await createTransfer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success',
      data: {
        id: 'transfer-id',
        amount: 100,
        currency: 'USD',
        sourceAccount: 'source-account-id',
        destinationAccount: 'destination-account-id'
      }
    });
  });
});
