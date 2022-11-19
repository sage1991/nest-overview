import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { validate } from "class-validator"

const passCases = new Set<ClassConstructor<any>>([String, Boolean, Number, Array, Object])

const isPassValidation = (metaType: ClassConstructor<any>) => passCases.has(metaType)

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly passThrough = [String, Boolean, Number, Array, Object]

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || isPassValidation(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      console.log(errors)
      throw new BadRequestException("Validation failed")
    }
    return value
  }
}
