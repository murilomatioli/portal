import { Request, Response, NextFunction } from 'express';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IGetId } from '../../types/userAuth';
import { jwtDecode } from 'jwt-decode';

dotenv.config();

export const authenticateJWT = (
    req: IGetId,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers['x-access-token'] as string;

        if (!token) {
            return res
                .status(403)
                .json({ message: 'Acesso negado. Token não fornecido.' });
        }

        jwt.verify(token, process.env.JWT_SECRET as string);
        const decoded = jwtDecode(token);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
