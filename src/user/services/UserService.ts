import { Injectable, NotFoundException } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "../entities"
import { CreateUserRequest } from "../models"

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  findAll() {
    return this.repository.find()
  }

  async findOne(id: string) {
    const user = await this.repository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`Cannot find user for given id: ${id}`)
    }
    return user
  }

  async create(request: CreateUserRequest) {
    const user = plainToInstance(UserEntity, request)
    return this.repository.save(user)
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}
