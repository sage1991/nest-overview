import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserEntity } from "../user/entities"

import { JwtModule } from "../core"
import { AuthService } from "./services"
import { AuthController } from "./controllers"
import { AccessTokenStrategy, RefreshTokenStrategy } from "./strategies"
import { TokenEntity } from "./entities"

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity]), JwtModule]
})
export class AuthModule {}
