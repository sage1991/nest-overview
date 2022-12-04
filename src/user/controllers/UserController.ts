import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"

import { UserService } from "../services"
import { CreateUserRequest, User } from "../models"
import { Public } from "../../core"
import { plainToInstance } from "class-transformer"

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Get()
  async findAll() {
    const users = await this.service.findAll()
    return users.map((user) => plainToInstance(User, user))
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }

  @Public()
  @Post()
  create(@Body() request: CreateUserRequest) {
    return this.service.create(request)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.delete(id)
  }
}
