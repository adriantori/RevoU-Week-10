import { Request, Response } from 'express';
import { AuthDao } from '../dao/authDao';

const createUser = async (req: Request, res: Response) => {
  const { username, role, password } = req.body;

  try {
    const authDao = new AuthDao(req.db); // Create authDao instance with the request's db reference

    const user = await authDao.createUser(username, role, password);
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const authDao = new AuthDao(req.db); // Create authDao instance with the request's db reference

    const user = await authDao.getAllUser();
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

export { createUser, getAllUsers };
