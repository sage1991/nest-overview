import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { Request } from "express"

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
      passReqToCallback: true
    })
  }

  validate(request: Request, payload: any) {
    const refreshToken = request.get("authorization").replace("Bearer", "").trim()
    return { ...payload, refreshToken }
  }
}
