import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common"
import { Response } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response: Response = context.getResponse()
    const { statusCode, message, error } = exception.getResponse() as any
    response.status(exception.getStatus()).json({
      statusCode,
      error,
      message,
      result: null
    })
  }
}
