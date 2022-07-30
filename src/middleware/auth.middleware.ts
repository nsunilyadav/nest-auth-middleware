import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private authentication() {
    return async (req, res, next) => {
      try {
        const bearerToken: string = req.headers.authorization || '';
        const token = bearerToken.replace('Bearer ', '').trim();
        await jwt.verify(token, 'secretOrPrivateKey');
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid Authentication' });
      }
    };
  }
  public use(req: Request, res: Response, next: NextFunction) {
    this.authentication()(req, res, next);
  }
}
