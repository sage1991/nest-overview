import { Module } from "@nestjs/common"

import { TimerController } from "./controllers"

@Module({
  controllers: [TimerController]
})
export class TimerModule {}
