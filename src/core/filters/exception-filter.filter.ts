import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class ExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      response.status(status)
        .json(exception);
    }
    else {
      response
        .status(500)
        .json({
          status: 500,
          message: exception.toString(),
          response: exception.toString()
        })
    }
  }
}
