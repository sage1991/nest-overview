import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { JoinColumn } from "typeorm"

import { CreateCatRequest, UpdateCatRequest } from "../models"
import { UserEntity } from "../../user/entities"

@Entity({ name: "cat" })
export class CatEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string

  @Column({ name: "name" })
  name: string

  @Column({ name: "age" })
  age: number

  @ManyToOne(() => UserEntity, (user) => user.cats)
  @JoinColumn({ name: "owner_id" })
  owner: UserEntity

  static from(request: CreateCatRequest) {
    const cat = new CatEntity()
    cat.name = request.name
    cat.age = request.age
    return cat
  }

  update(request: UpdateCatRequest) {
    this.age = request.age ?? this.age
    this.name = request.name ?? this.name
  }
}
