import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

import { Cat, CreateCatRequest, UpdateCatRequest } from "../model"
import { cats } from "../__mock__"

@Injectable()
export class CatService {
  findAll() {
    return cats
  }

  findOne(id: string) {
    const cat = cats.find((cat) => cat.id === id)
    if (!cat) {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND)
    }
    return cat
  }

  create(request: CreateCatRequest) {
    const id = `${Date.now()}`
    const cat: Cat = {
      ...request,
      id
    }
    cats.push(cat)
    return cat
  }

  update(id: string, request: UpdateCatRequest) {
    const index = cats.findIndex((cat) => cat.id === id)
    let cat: Cat | null = null
    if (index >= 0) {
      cat = {
        ...cats[index],
        ...request
      }
      cats[index] = cat
    }
    return cat
  }

  delete(id: string) {
    const index = cats.findIndex((cat) => cat.id === id)
    let cat: Cat | null = null
    if (index >= 0) {
      cat = cats.splice(index, 1)[0]
    }
    return cat
  }
}
