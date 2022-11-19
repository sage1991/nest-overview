import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateCatRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsNotEmpty()
  age: number
}
