import { APP_GUARD } from "@nestjs/core"
import { Global, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule as NestJwtModule } from "@nestjs/jwt"

import { JwtStrategy } from "./strategies"
import { JwtAuthGuard } from "./guards"

const FIFTEEN_MINUTE = 60 * 15

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
        signOptions: { expiresIn: FIFTEEN_MINUTE }
      })
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    JwtStrategy
  ],
  exports: [NestJwtModule]
})
export class JwtModule {}
