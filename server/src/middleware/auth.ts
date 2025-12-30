import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/config';
import { User } from '../models';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: 'agent' | 'manager' | 'admin';
    name: string;
  };
}

interface JwtPayload {
  id: number;
  email: string;
  role: 'agent' | 'manager' | 'admin';
  name: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    // Verify user still exists and is active
    const user = await User.findByPk(decoded.id);

    if (!user || !user.is_active) {
      res.status(401).json({ message: 'User not found or inactive' });
      return;
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    res.status(500).json({ message: 'Authentication error' });
  }
};

export const generateToken = (user: {
  id: number;
  email: string;
  role: 'agent' | 'manager' | 'admin';
  name: string;
}): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const secret: Secret = config.jwt.secret;
  const options: SignOptions = { expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, secret, options);
};
