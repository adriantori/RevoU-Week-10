import { Request, Response } from 'express';
import AuthService from '../../../services/authService';
import { registerUser } from '../../../controllers/authController';

// Mocks
jest.mock('../../../services/authService');
jest.mock('jsonwebtoken');

describe('registerUser function', () => {
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

  it('should register a user', async () => {
    const req = mockRequest({ username: 'testuser', role: 'maker', password: 'password' });
    const res = mockResponse();

    // Mock AuthService's registerUser to return a user object
    (AuthService.prototype.registerUser as jest.Mock).mockResolvedValue({ username: 'testuser', role: 'maker' });

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success',
      data: { username: 'testuser', role: 'maker' }
    });
  });
});
