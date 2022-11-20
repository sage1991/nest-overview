import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"

import { UserMiddleware, CoreModule } from "./core"
import { CatModule } from "./cats"
import { TimerModule } from "./timer"
import { UserModule } from "./user"

@Module({
  imports: [CoreModule, CatModule, TimerModule, UserModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
