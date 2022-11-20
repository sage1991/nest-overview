import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Request } from "express"
import { tap } from "rxjs"

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request: Request = context.switchToHttp().getRequest()
    const now = Date.now()
    console.log("Before handle: ", request.url)
    return next
      .handle()
      .pipe(tap(() => console.log("After handle: ", request.url, `(${Date.now() - now}ms)`)))
  }
}
