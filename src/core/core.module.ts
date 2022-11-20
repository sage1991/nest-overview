import { Module, ValidationPipe } from "@nestjs/common"
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"

import { HttpExceptionFilter } from "./filters"
import { RoleGuard } from "./guards"
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  TransformResponseInterceptor
} from "./interceptors"

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor
    }
  ]
})
export class CoreModule {}
