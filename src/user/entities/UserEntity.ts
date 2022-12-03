import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

import { CatEntity } from "../../cats/entities"

import { CreateUserRequest } from "../models"

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string

  @Column({ name: "first_name" })
  firstName: string

  @Column({ name: "last_name" })
  lastName: string

  @Index({ unique: true })
  @Column({ name: "email" })
  email: string

  @Column({ name: "password" })
  password: string

  @Column({ name: "is_active", default: true })
  isActive: boolean

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @OneToMany(() => CatEntity, (cat) => cat.owner)
  cats: CatEntity[]

  static from(request: CreateUserRequest) {
    const user = new UserEntity()
    user.firstName = request.firstName
    user.lastName = request.lastName
    return user
  }
}
