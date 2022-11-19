import { Injectable, NotFoundException } from "@nestjs/common"

import { Cat, CreateCatRequest, UpdateCatRequest } from "../model"
import { cats } from "../__mock__"

@Injectable()
export class CatService {
  findAll() {
    return cats
  }

  findOne(id: number) {
    const cat = cats.find((cat) => cat.id === id)
    if (!cat) {
      throw new NotFoundException(`Cannot found cat for given id: ${id}`)
    }
    return cat
  }

  create(request: CreateCatRequest) {
    const id = Date.now()
    const cat: Cat = {
      ...request,
      id
    }
    cats.push(cat)
    return cat
  }

  update(id: number, request: UpdateCatRequest) {
    const index = cats.findIndex((cat) => cat.id === id)
    if (index === -1) {
      throw new NotFoundException(`Cannot found cat for given id: ${id}`)
    }
    cats[index] = {
      ...cats[index],
      ...request
    }
    return cats[index]
  }

  delete(id: number) {
    const index = cats.findIndex((cat) => cat.id === id)
    if (index === -1) {
      throw new NotFoundException(`Cannot found cat for given id: ${id}`)
    }
    return cats.splice(index, 1)[0]
  }
}
