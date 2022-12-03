import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { InjectRepository } from "@nestjs/typeorm"
import { DataSource, Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

import { UserEntity } from "../../user/entities"
import { User } from "../../user/models"

import { IssueTokenRequest, LocalSignupRequest, Token } from "../models"
import { TokenEntity } from "../entities"
import { compareHash, hash } from "../../utils"

const ONE_WEEK = 60 * 60 * 24 * 7

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly datasource: DataSource
  ) {}

  async signup(request: LocalSignupRequest) {
    const userWithSameEmail = await this.userRepository.findOneBy({ email: request.email })
    if (userWithSameEmail) {
      throw new BadRequestException(`User already exist for given email: ${request.email}`)
    }

    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userEntity = await queryRunner.manager.save(
        plainToInstance(UserEntity, {
          ...request,
          password: await hash(request.password)
        })
      )

      const token = await this.createJwt(userEntity)
      await queryRunner.manager.save(plainToInstance(TokenEntity, { ...token, user: userEntity }))
      await queryRunner.commitTransaction()

      return plainToInstance(User, { ...userEntity, token })
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
  }

  async issueToken(request: IssueTokenRequest) {
    const userEntity = await this.userRepository.findOneBy({ email: request.email })
    if (!userEntity) {
      throw new ForbiddenException("Access denied")
    }
    ;``
    const isPasswordMatches = await compareHash({
      plain: request.password,
      encrypted: userEntity?.password
    })
    if (!isPasswordMatches) {
      throw new ForbiddenException("Access denied")
    }

    const token = await this.createJwt(userEntity)
    await this.tokenRepository.save(plainToInstance(TokenEntity, { ...token, user: userEntity }))
    return token
  }

  refreshToken() {
    return ""
  }

  logout() {
    return ""
  }

  private async createJwt(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email
    }
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: ONE_WEEK })
    ])
    return plainToInstance(Token, { access, refresh })
  }
}
