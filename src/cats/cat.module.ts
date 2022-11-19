import { Module } from "@nestjs/common"

import { CatsController } from "./controllers"
import { CatService } from "./services"

@Module({
  controllers: [CatsController],
  providers: [CatService],
  exports: [CatService]
})
export class CatModule {}
