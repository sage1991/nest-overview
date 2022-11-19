import { IsInt, IsOptional, IsString } from "class-validator"

export class UpdateCatRequest {
  @IsString()
  @IsOptional()
  name: string

  @IsInt()
  @IsOptional()
  age: number
}
