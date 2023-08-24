import { Request, Response } from 'express';
import { AuthDao } from '../dao/authDao';
import AuthService from '../services/authService';
import jwt from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';

const registerUser = async (req: Request, res: Response) => {
  const { username, role, password } = req.body;

  try {
    const authDao = new AuthDao(req.db);
    const authService = new AuthService(authDao);
    
    const user = await authService.registerUser(username, role, password);
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

const loginUser = async (req: Request, res:Response) => {
  const { username, password } = req.body;
  
  const authDao = new AuthDao(req.db);
  const authService = new AuthService(authDao);

  const user = await authService.loginUser(username, password)

  if(user){
    const token = jwt.sign({ username: user.username, id: user._id, role: user.role}, JWT_SIGN!)
    res.status(200).json({
      message: 'User successfully logged in',
      data: token
    });
  }else {
    res.status(400).json({
      error: 'password is incorrect'
    });
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const authDao = new AuthDao(req.db);
    const authService = new AuthService(authDao);

    const users = await authService.getAllUsers();
    res.status(200).json({
      message: 'success',
      data: users
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

export { registerUser, getAllUsers, loginUser };
