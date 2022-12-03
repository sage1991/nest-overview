import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "../../user/entities"

import { CreateCatRequest, UpdateCatRequest } from "../models"
import { CatEntity } from "../entities"

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity) private readonly catRepository: Repository<CatEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  findAll(userId: string) {
    return this.catRepository.find({ where: { owner: { id: userId } } })
  }

  async findOne(userId: string, id: string) {
    const cat = await this.catRepository.findOneBy({ id, owner: { id: userId } })
    if (!cat) {
      throw new NotFoundException(`Cannot found cat for given id: ${id}`)
    }
    return cat
  }

  async create(userId: string, request: CreateCatRequest) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      throw new BadRequestException(`Invalid user id: ${userId}`)
    }
    const cat = plainToInstance(CatEntity, request)
    cat.owner = user
    return this.catRepository.save(cat)
  }

  async update(userId: string, id: string, request: UpdateCatRequest) {
    const cat = await this.catRepository.findOneBy({ id, owner: { id: userId } })
    if (!cat) {
      throw new NotFoundException(`Cannot found cat for given id: ${id}`)
    }
    cat.update(request)
    return this.catRepository.save(cat)
  }

  delete(userId: string, id: string) {
    return this.catRepository.delete({ id, owner: { id: userId } })
  }
}
