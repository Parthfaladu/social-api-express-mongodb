import { Request, Response, NextFunction } from 'express';
import { verifyToken, IToken } from '../services/user';

const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if(token) {
            const user = verifyToken(token) as IToken;
            (req as any).user = user;
            return next();
        }
        return res.status(401).json({ message: 'Invalid token' });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authentication;