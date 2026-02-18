import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token manquant' });

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;

    (req as any).user = decoded;

    return next();
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expire' });
  }
};
