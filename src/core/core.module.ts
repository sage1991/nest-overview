import { Module, ValidationPipe } from "@nestjs/common"
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"

import { HttpExceptionFilter } from "./filters"
import { AuthGuard } from "./guards"
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  TransformResponseInterceptor
} from "./interceptors"
import { EnvModule } from "./env"
import { DataSourceModule } from "./datasource"

@Module({
  imports: [EnvModule, DataSourceModule],
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
      useClass: AuthGuard
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
