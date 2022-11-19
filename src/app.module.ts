import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"

import { LoggerMiddleware, HttpExceptionFilter } from "./core"
import { CatModule } from "./cats"

@Module({
  imports: [CatModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
