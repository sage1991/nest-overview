import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from "@nestjs/common"

import { CreateCatRequest, UpdateCatRequest } from "../models"
import { CatService } from "../services"

@Controller("cats")
export class CatsController {
  constructor(private readonly service: CatService) {}

  @Get()
  findAll(@Headers("user-id") userId: string) {
    return this.service.findAll(userId)
  }

  @Get(":id")
  findOne(@Headers("user-id") userId: string, @Param("id") id: string) {
    return this.service.findOne(userId, id)
  }

  @Post()
  create(@Headers("user-id") userId: string, @Body() request: CreateCatRequest) {
    return this.service.create(userId, request)
  }

  @Put(":id")
  update(
    @Headers("user-id") userId: string,
    @Param("id") id: string,
    @Body() request: UpdateCatRequest
  ) {
    return this.service.update(userId, id, request)
  }

  @Delete(":id")
  delete(@Headers("user-id") userId: string, @Param("id") id: string) {
    return this.service.delete(userId, id)
  }
}
