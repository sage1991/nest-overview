import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserController } from "./controllers"
import { UserEntity } from "./entities"
import { UserService } from "./services"
import { CatEntity } from "../cats/entities"

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, CatEntity])],
  exports: [UserService]
})
export class UserModule {}
