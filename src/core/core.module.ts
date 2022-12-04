import { Module, ValidationPipe } from "@nestjs/common"
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"

import { HttpExceptionFilter } from "./filters"
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  TransformResponseInterceptor
} from "./interceptors"
import { DataSourceModule } from "./datasource"
import { JwtModule } from "./jwt"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./env/.env",
      isGlobal: true
    }),
    DataSourceModule,
    JwtModule
  ],
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
