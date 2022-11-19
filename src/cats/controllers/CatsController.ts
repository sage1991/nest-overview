import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"

import { CreateCatRequest, UpdateCatRequest } from "../model"
import { CatService } from "../services"

@Controller("cats")
export class CatsController {
  constructor(private readonly service: CatService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() request: CreateCatRequest) {
    return this.service.create(request)
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() request: UpdateCatRequest) {
    return this.service.update(id, request)
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.service.delete(id)
  }
}
