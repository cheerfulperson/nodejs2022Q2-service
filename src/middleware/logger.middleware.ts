import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from 'src/shared/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLoggerService();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.detectLog(
        `[${new Date().toISOString()}] Logging HTTP request ${req.method} ${
          req.url
        } ${res.statusCode}`,
        res.statusCode,
      );
    });
    next();
  }
}
