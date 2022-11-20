export interface ApiResponse<T> {
  statusCode: number
  message: string | string[]
  error?: string
  result: T
}
