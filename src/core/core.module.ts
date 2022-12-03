import { Module, ValidationPipe } from "@nestjs/common"
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"

import { HttpExceptionFilter } from "./filters"
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  TransformResponseInterceptor
} from "./interceptors"
import { EnvModule } from "./env"
import { DataSourceModule } from "./datasource"
import { JwtModule } from "./jwt"

@Module({
  imports: [EnvModule, DataSourceModule, JwtModule],
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
