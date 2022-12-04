import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "../entities"
import { CreateUserRequest, User } from "../models"
import { hash } from "../../utils"

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
    const userWithSameEmail = await this.repository.findOneBy({
      email: request.email
    })
    if (userWithSameEmail) {
      throw new ConflictException(`User already exist with same email: ${request.email}`)
    }
    const password = await hash(request.password)
    const user = await this.repository.save(
      plainToInstance(UserEntity, {
        ...request,
        password
      })
    )
    return plainToInstance(User, user)
  }

  delete(id: string) {
    return this.repository.delete(id)
  }
}
