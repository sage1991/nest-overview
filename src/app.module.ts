import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"

import { UserMiddleware, CoreModule } from "./core"
import { TimerModule } from "./timer/timer.module"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [CoreModule, TimerModule, UserModule, AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
