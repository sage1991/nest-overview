import { Cat } from "./Cat"

export type CreateCatRequest = Omit<Cat, "id">
