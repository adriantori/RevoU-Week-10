import jwt, { JwtPayload } from 'jsonwebtoken';
import JWT_SIGN from '../config/jwt';
import { Request, Response, NextFunction } from 'express';

const authz = (req: Request, res:Response, next:NextFunction) => {
    const authzHeader = req.headers.authorization;

    console.log(authzHeader);

    if(!authzHeader){
        res.status(401).json({
            error: 'Unauthorized'
        });
        return
    }else{
        const token = authzHeader.split(' ')[1];
        console.log(token);
        try {
            const decodedToken: JwtPayload = jwt.verify(token, JWT_SIGN!) as JwtPayload;

            if(decodedToken.role === 'admin'){
                next()
            }else{
                res.status(401).json({ 
                    error: 'Unauthorized' 
                });
                return
            }
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
            return
        };
    };
}

export default authz;