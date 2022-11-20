import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { CatsController } from "./controllers"
import { CatService } from "./services"
import { CatEntity } from "./entities"
import { UserEntity } from "../user/entities"

@Module({
  controllers: [CatsController],
  providers: [CatService],
  imports: [TypeOrmModule.forFeature([UserEntity, CatEntity])],
  exports: [CatService]
})
export class CatModule {}
