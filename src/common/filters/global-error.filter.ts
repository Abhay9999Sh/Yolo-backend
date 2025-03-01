import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';

    // Check if the exception is an instance of HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();

      // Extract the message from HttpException response
      message =
        typeof responseMessage === 'string'
          ? responseMessage
          : JSON.stringify(responseMessage);
    }

    // Send a standardized error response
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
