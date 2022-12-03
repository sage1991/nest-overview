import { compare } from "bcrypt"

interface Config {
  plain: string
  encrypted: string
}

export const compareHash = ({ plain, encrypted }: Config) => compare(plain, encrypted)
