import jwt from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';
import { Request, Response, NextFunction } from 'express';

const authn = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authnHeader = req.headers.authorization;
    try {
      if (!authnHeader) {
        res.status(401).json({
          message: 'Unauthorized',
          error: 'No authentication header provided'
        });
        return;
      }
  
      const token = authnHeader.split(' ')[1];

      const decodedToken: any = jwt.verify(token, JWT_SIGN!);
      const userRole = decodedToken.role; // Replace 'role' with the actual field in your decoded token containing the user's role
      if (allowedRoles.includes(userRole)) {
        next(); // User is authenticated and has an allowed role, proceed to the next middleware or route handler.
      } else {
        res.status(403).json({
          message: 'Forbidden',
          error: 'User does not have the required role'
        });
      }
    } catch (error: any) {
      res.status(400).json({
        message: 'Bad Request',
        error: error.message
      });
    }
  };
};

export default authn;
