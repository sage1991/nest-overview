import { SetMetadata } from "@nestjs/common"

export const PUBLIC_API_METADATA_KEY = "PUBLIC_API_METADATA_KEY"

export const Public = () => SetMetadata(PUBLIC_API_METADATA_KEY, true)
