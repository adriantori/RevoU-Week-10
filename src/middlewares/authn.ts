import jwt from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';
import { Request, Response, NextFunction } from 'express';

const authn = (req: Request, res: Response, next: NextFunction) => {
    const authnHeader = req.headers.authorization;

    if (!authnHeader) {
        res.status(401).json({
            error: 'unauthorized'
        });
    } else {
        const token = authnHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, JWT_SIGN!);
            next()
        } catch (error: any) {
            res.status(400).json({
                message: 'error',
                error: error.message
            });
        }
    }
}

export default authn;