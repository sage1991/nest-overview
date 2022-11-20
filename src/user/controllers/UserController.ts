import { Controller, Get } from "@nestjs/common"

import { User, UserModel } from "../../core"

@Controller("user")
export class UserController {
  @Get(":id")
  findOne(@User() user: UserModel) {
    return user
  }
}
