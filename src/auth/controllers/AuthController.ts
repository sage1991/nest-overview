import { Body, Controller, Headers, HttpCode, HttpStatus, Post } from "@nestjs/common"

import { AuthService } from "../services"
import { IssueTokenRequest } from "../models"
import { Public } from "../../core"

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post("/token/issue")
  issueToken(@Body() request: IssueTokenRequest) {
    return this.service.issueToken(request)
  }

  @Post("/token/refresh")
  refreshToken(@Headers("user-id") userId: string, @Headers("jwt") refreshToken: string) {
    return this.service.refreshToken(userId, refreshToken)
  }

  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  logout(@Headers("user-id") userId: string) {
    return this.service.logout(userId)
  }
}
