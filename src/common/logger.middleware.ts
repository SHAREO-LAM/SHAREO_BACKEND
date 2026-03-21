import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const start = Date.now();

    // Get user info from JWT (if authenticated)
    const user = (req as any).user?.login || (req as any).user?.email || 'Anonymous';
    const userId = (req as any).user?.userId || '-';

    const timestamp = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    // Format request body (hide sensitive fields)
    let requestBody = '';
    if (body && Object.keys(body).length > 0) {
      const sanitized = { ...body };
      if (sanitized.password) sanitized.password = '***hidden***';
      if (sanitized.access_token) sanitized.access_token = '***hidden***';
      requestBody = ` | Body: ${JSON.stringify(sanitized)}`;
    }

    // Capture logger reference for use in closures
    const logger = this.logger;

    // Intercept both res.send and res.json
    const originalSend = res.send;
    const originalJson = res.json;

    // Helper function to format and log
    const logResponse = (data: any) => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const statusEmoji =
        statusCode >= 200 && statusCode < 300
          ? '✅'
          : statusCode >= 300 && statusCode < 400
            ? '↩️'
            : statusCode >= 400 && statusCode < 500
              ? '⚠️'
              : '❌';

      let responseInfo = '';
      try {
        if (data && typeof data === 'object') {
          if (data.access_token) {
            responseInfo = ' | Response: { access_token: ***hidden***, ... }';
          } else if (data.message) {
            responseInfo = ` | Response: "${data.message}"`;
          } else {
            const responseStr = JSON.stringify(data);
            if (responseStr.length > 100) {
              responseInfo = ` | Response: ${responseStr.substring(0, 100)}...`;
            } else {
              responseInfo = ` | Response: ${responseStr}`;
            }
          }
        } else if (typeof data === 'string') {
          try {
            const parsed = JSON.parse(data);
            if (parsed.access_token) {
              responseInfo = ' | Response: { access_token: ***hidden***, ... }';
            } else if (parsed.message) {
              responseInfo = ` | Response: "${parsed.message}"`;
            } else {
              const responseStr = JSON.stringify(parsed);
              if (responseStr.length > 100) {
                responseInfo = ` | Response: ${responseStr.substring(0, 100)}...`;
              } else {
                responseInfo = ` | Response: ${responseStr}`;
              }
            }
          } catch (e) {
            if (data.length < 100) {
              responseInfo = ` | Response: "${data}"`;
            }
          }
        }
      } catch (e) {
        // Binary or unparseable data
      }

      const logMessage = `${timestamp} ${statusEmoji} [${statusCode}] ${method.toUpperCase().padEnd(6)} ${originalUrl.padEnd(40)} (${duration}ms) | User: ${userId}/${user}${requestBody}${responseInfo}`;

      if (statusCode >= 400) {
        logger.error(logMessage);
      } else {
        logger.log(logMessage);
      }
    };

    // Override res.json (most common in NestJS)
    res.json = function (data: any) {
      logResponse(data);
      return originalJson.call(this, data);
    };

    // Also override res.send for safety
    // res.send = function (data: any) {
    //   logResponse(data);
    //   return originalSend.call(this, data);
    // };

    next();
  }
}
