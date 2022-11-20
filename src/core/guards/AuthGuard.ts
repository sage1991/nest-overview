import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"

import { BYPASS_API } from "../decorators"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const bypass = this.reflector.get<string[]>(BYPASS_API, context.getHandler())
    if (bypass) {
      return true
    }
    const { headers }: Request = context.switchToHttp().getRequest()
    return !!headers["user-id"]
  }
}
