import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

import { UserEntity } from "../../user/entities"

@Entity({ name: "jwt_tokens" })
export class TokenEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Index()
  @Column({ name: "access_token" })
  access: string

  @Index()
  @Column({ name: "refresh_token" })
  refresh: string

  @Index()
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: UserEntity

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
