import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserEntity } from "../user/entities"
import { AuthService } from "./services"
import { AuthController } from "./controllers"
import { TokenEntity } from "./entities"

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])]
})
export class AuthModule {}
