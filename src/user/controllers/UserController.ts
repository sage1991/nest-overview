import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"

import { UserService } from "../services"
import { CreateUserRequest } from "../models"

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() request: CreateUserRequest) {
    return this.service.create(request)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.delete(id)
  }
}
