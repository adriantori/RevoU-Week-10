import { Request, Response } from 'express';
import { AuthDao } from '../dao/authDao';
import AuthService from '../services/authService';
import jwt from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';

const registerUser = async (req: Request, res: Response) => {
  const { username, role, password } = req.body;
  const sanitizedRole = role.toLowerCase();

  try {
    const validateUsername = (username: string): boolean => {
      return !!username && username.trim() !== '';
    };
    
    const validateRole = (role: string): boolean => {
      const validRoles = ['maker', 'approver', 'admin'];
      return validRoles.includes(role);
    };
    
    const validatePassword = (password: string): boolean => {
      const alphanumericPattern = /^[a-zA-Z0-9]{8,}$/;
      return alphanumericPattern.test(password);
    };
    
    if (!validateUsername(username)) {
      return res.status(400).json({
        message: 'User field cannot be blank'
      });
    }
    
    if (!validateRole(sanitizedRole)) {
      return res.status(400).json({
        message: 'Role is invalid. Must contain either "maker", "approver", or "admin"'
      });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password is invalid. Must contain alphanumeric and minimum 8 characters'
      });
    }
    
    const authDao = new AuthDao(req.db);
    const authService = new AuthService(authDao);
    
    const user = await authService.registerUser(username, sanitizedRole, password);
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
    const token = jwt.sign({ username: user.username, role: user.role}, JWT_SIGN!)
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
