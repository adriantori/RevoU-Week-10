import { Request, Response } from 'express';
import TransferService from '../../../services/transferService';
import { ObjectId } from 'mongodb';
import { patchTransfer } from '../../../controllers/transferController';

// Mocks
jest.mock('../../../services/transferService');
jest.mock('mongodb');

describe('patchTransfer function', () => {
  const mockRequest = (body: any, params: any) => ({
    body,
    params
  }) as Request;
  const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a transfer status', async () => {
    const req = mockRequest({ status: 'approved' }, { id: 'transfer-id' });
    const res = mockResponse();

    // Mock ObjectId constructor
    (ObjectId as any).mockImplementation((id: any) => id);

    // Mock TransferService's updateTransfer to return an updated transfer object
    (TransferService.prototype.updateTransfer as jest.Mock).mockResolvedValue({
      // Define the properties of the updated transfer object here
      id: 'transfer-id',
      status: 'approved'
    });

    await patchTransfer(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success',
      data: {
        id: 'transfer-id',
        status: 'approved'
      }
    });
  });

  it('should handle invalid status', async () => {
    const req = mockRequest({ status: 'invalid-status' }, { id: 'transfer-id' });
    const res = mockResponse();

    await patchTransfer(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'error',
      error: 'Invalid status. Status must be either "approved" or "rejected".'
    });
  });
});
