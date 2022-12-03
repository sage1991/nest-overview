import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { CatEntity } from "../cats/entities"

import { UserController } from "./controllers"
import { UserEntity } from "./entities"
import { UserService } from "./services"

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, CatEntity])],
  exports: [UserService]
})
export class UserModule {}
