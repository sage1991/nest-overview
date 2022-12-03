import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"

import { AuthService } from "../services"
import { LocalSignupRequest, IssueTokenRequest } from "../models"
import { Public } from "../../core"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/signup/local")
  signup(@Body() request: LocalSignupRequest) {
    return this.authService.signup(request)
  }

  @Post("/token/issue")
  issueToken(@Body() request: IssueTokenRequest) {
    return this.authService.issueToken(request)
  }

  @Post("/token/refresh")
  refreshToken() {
    return this.authService.refreshToken()
  }

  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.authService.logout()
  }
}
