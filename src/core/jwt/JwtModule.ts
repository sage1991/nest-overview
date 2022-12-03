import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule as NestJwtModule, JwtService } from "@nestjs/jwt"
import { APP_GUARD } from "@nestjs/core"

import { JwtStrategy } from "./strategies"
import { JwtAuthGuard } from "./guards"

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
        signOptions: { expiresIn: 60 * 15 }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    JwtStrategy,
    JwtService
  ],
  exports: [JwtService]
})
export class JwtModule {}
