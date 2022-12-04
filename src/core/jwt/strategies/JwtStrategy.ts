import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "express"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
      passReqToCallback: true
    })
  }

  validate(request: Request, payload: any) {
    request.headers["user-id"] = payload.sub
    request.headers["email"] = payload.email
    request.headers["jwt"] = request.headers["authorization"].replace("Bearer", "").trim() ?? ""
    return payload
  }
}
