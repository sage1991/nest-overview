import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    response.status(exception.getStatus()).json({
      ...(exception.getResponse() as any),
      timestamp: new Date().toISOString()
    })
  }
}
