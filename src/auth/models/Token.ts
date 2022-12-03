import { Expose } from "class-transformer"

export class Token {
  @Expose()
  access: string

  @Expose()
  refresh: string
}
