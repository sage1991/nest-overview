import { Exclude, Expose, Type } from "class-transformer"

import { Token } from "../../auth/models"

export class User {
  @Expose()
  id: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  email: string

  @Exclude()
  password: string

  @Expose()
  isActive: boolean

  @Type(() => Token)
  token: Token

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
