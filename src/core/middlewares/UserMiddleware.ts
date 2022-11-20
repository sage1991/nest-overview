import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    req.user = {
      id: "aGFycnkua2FuZQ==",
      name: "HS Kim",
      age: 100,
      roles: ["admin"]
    }
    next()
  }
}
