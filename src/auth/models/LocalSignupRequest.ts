import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LocalSignupRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
