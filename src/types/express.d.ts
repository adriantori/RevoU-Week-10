import { Request } from 'express';
import { Db } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      db: Db;
    }
  }
}
