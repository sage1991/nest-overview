import { Request as OriginalRequest } from "express"

import { UserModel } from "../core"

declare module "express" {
  interface Request extends OriginalRequest {
    user: UserModel
  }
}
