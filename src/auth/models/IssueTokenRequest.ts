import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class IssueTokenRequest {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
