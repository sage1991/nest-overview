import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"

import { UserModel } from "../models"

type UserProperty = keyof UserModel

export const User = createParamDecorator<UserProperty, ExecutionContext>((data, input) => {
  const { user } = input.switchToHttp().getRequest() as Request
  return data ? user?.[data] : user
})
