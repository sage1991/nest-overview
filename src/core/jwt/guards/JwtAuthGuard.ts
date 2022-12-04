import { Reflector } from "@nestjs/core"
import { AuthGuard } from "@nestjs/passport"
import { ExecutionContext, Injectable } from "@nestjs/common"

import { PUBLIC_API_METADATA_KEY } from "../decorators"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_METADATA_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    return isPublic || super.canActivate(context)
  }
}
