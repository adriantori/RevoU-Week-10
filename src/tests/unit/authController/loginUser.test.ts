import { Request, Response } from 'express';
import AuthService from '../../../services/authService';
import jwt from 'jsonwebtoken';
import { loginUser } from '../../../controllers/authController';

// Mocks
jest.mock('../../../dao/authDao'); // You can mock AuthDao as needed
jest.mock('../../../services/authService');
jest.mock('jsonwebtoken');

describe('loginUser function', () => {
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

  it('should log in a user and return a token', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password' });
    const res = mockResponse();

    // Mock AuthService's loginUser to return a user object
    (AuthService.prototype.loginUser as jest.Mock).mockResolvedValue({ username: 'testuser', role: 'user' });

    // Mock jwt.sign to return a token
    (jwt.sign as jest.Mock).mockReturnValue('mocked-token');

    // Mock the AuthDao instance
    const mockAuthDaoInstance: any = {
      // Define any necessary methods here if needed for testing purposes
    };

    await loginUser(req, res, mockAuthDaoInstance);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User successfully logged in',
      data: 'mocked-token'
    });
  });

  it('should return an error when password is incorrect', async () => {
    const req = mockRequest({ username: 'testuser', password: 'incorrectpassword' });
    const res = mockResponse();

    // Mock AuthService's loginUser to return null, indicating incorrect password
    (AuthService.prototype.loginUser as jest.Mock).mockResolvedValue(null);

    // Mock the AuthDao instance
    const mockAuthDaoInstance: any = {
      // Define any necessary methods here if needed for testing purposes
    };

    await loginUser(req, res, mockAuthDaoInstance);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'password is incorrect'
    });
  });
});
