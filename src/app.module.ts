import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"

import { CatModule } from "./cats"
import { LoggerMiddleware } from "./core"

@Module({
  imports: [CatModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
