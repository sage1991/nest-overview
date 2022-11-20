import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException
} from "@nestjs/common"
import { catchError, throwError, timeout, TimeoutError } from "rxjs"

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      timeout(5000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(
            () => new RequestTimeoutException("Looks like the server is taking to long to response")
          )
        }
        return throwError(() => error)
      })
    )
  }
}
