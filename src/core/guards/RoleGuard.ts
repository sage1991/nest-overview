import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>("roles", context.getHandler())
    if (!roles) {
      return true
    }
    const { user }: Request = context.switchToHttp().getRequest()
    return roles.some((role) => user.roles.includes(role))
  }
}
