import jwt, { JwtPayload } from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';
import { Request, Response, NextFunction } from 'express';

const authz = (req: Request, res:Response, next:NextFunction) => {
    const authzHeader = req.headers.authorization;

    if(!authzHeader){
        res.status(401).json({
            error: 'Unauthorized'
        });
    }else{
        const token = authzHeader.split(' ')[1];
        try {
            const decodedToken: JwtPayload = jwt.verify(token, JWT_SIGN!) as JwtPayload;

            if(decodedToken.role === 'admin'){
                next()
            }else{
                res.status(401).json({ 
                    error: 'Unauthorized' 
                });
            }
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        };
    };
}

export default authz;