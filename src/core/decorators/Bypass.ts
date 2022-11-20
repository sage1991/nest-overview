import { SetMetadata } from "@nestjs/common"

export const BYPASS_API = "bypass"

export const Bypass = () => SetMetadata(BYPASS_API, true)
