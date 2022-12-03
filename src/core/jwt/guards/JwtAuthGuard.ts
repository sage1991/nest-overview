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
    const isPublicApi =
      this.reflector.get<boolean>(PUBLIC_API_METADATA_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(PUBLIC_API_METADATA_KEY, context.getClass())
    return isPublicApi || super.canActivate(context)
  }
}
