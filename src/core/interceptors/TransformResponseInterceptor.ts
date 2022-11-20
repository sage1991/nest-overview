import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map, Observable } from "rxjs"
import { Response } from "express"

import { ApiResponse } from "../models"

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor<any, ApiResponse<any>> {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<ApiResponse<any>> {
    return next.handle().pipe(
      map((data) => {
        const { statusCode } = context.switchToHttp().getResponse() as Response
        return {
          statusCode,
          message: "success",
          result: data
        }
      })
    )
  }
}
