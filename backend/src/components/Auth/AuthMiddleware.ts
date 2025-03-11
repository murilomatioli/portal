import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers['x-access-token'] as String;

        if (!token || typeof token !== 'string') {
            return res
                .status(403)
                .json({ message: 'Acesso negado. Token não fornecido.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
