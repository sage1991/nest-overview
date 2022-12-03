import { hash as bcryptHash } from "bcrypt"

export const hash = (data: string) => bcryptHash(data, 10)
