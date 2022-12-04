import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { JwtService } from "@nestjs/jwt"
import { plainToInstance } from "class-transformer"
import { Repository } from "typeorm"

import { UserEntity } from "../../user/entities"
import { IssueTokenRequest, Token } from "../models"
import { TokenEntity } from "../entities"
import { compareHash } from "../../utils"

const ONE_WEEK = 60 * 60 * 24 * 7

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>
  ) {}

  async issueToken({ email, password }: IssueTokenRequest) {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
      throw new NotFoundException(`Cannot find user for given email: ${email}`)
    }

    const isSame = await compareHash({
      plain: password,
      encrypted: user.password
    })
    if (!isSame) {
      throw new ForbiddenException(`Access denied: invalid password`)
    }

    const token = await this.tokenRepository.save(await this.createJwt(user))
    return plainToInstance(Token, token, { excludeExtraneousValues: true })
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      throw new NotFoundException(`Cannot find user for given userId: ${userId}`)
    }

    const token = await this.tokenRepository.findOneBy({ refresh: refreshToken })
    if (!token) {
      throw new ForbiddenException("Access Denied: invalid token")
    }

    const newToken = await this.createJwt(user)
    await this.tokenRepository.update({ id: token.id }, newToken)
    return plainToInstance(Token, newToken, { excludeExtraneousValues: true })
  }

  async logout(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      throw new NotFoundException(`Cannot find user for given userId: ${userId}`)
    }
    await this.tokenRepository.delete({ user })
  }

  private async createJwt(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email
    }
    const [access, refresh] = await Promise.all([
      this.jwt.signAsync(payload),
      this.jwt.signAsync(payload, { expiresIn: ONE_WEEK })
    ])
    return plainToInstance(TokenEntity, { access, refresh, user })
  }
}
