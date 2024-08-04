import jwt from 'jsonwebtoken';

export interface IToken {
    id: string, 
    password: string, 
    email: string
}

export const verifyToken = (Authorization?: string): IToken => {
    if(Authorization) {
        const decoded = jwt.verify(Authorization, 'shhhhh');
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded as IToken;
        }
    }
    throw new Error('No Authorization token provided');
}