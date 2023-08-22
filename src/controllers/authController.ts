import { Request, Response } from 'express';
import { AuthDao } from '../dao/authDao'
import { MongoConnection } from '../middlewares/mongoConnection';

const authDao = new AuthDao(MongoConnection.getDb());

const createUser = async (req: Request, res: Response) => {
  const { username, role, password } = req.body;

  try {
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

export { createUser };
