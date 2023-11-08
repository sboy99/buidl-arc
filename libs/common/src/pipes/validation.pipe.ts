// import {
//   ArgumentMetadata,
//   BadRequestException,
//   Injectable,
//   PipeTransform,
// } from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
// import { ValidationError, validate } from 'class-validator';

// @Injectable()
// export class ValidationPipe implements PipeTransform<unknown> {
//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype) {
//       return value;
//     }

//     const object = plainToInstance(metatype, value);
//     const errors = await validate(object);

//     if (errors.length > 0) {
//       const e = this.buildError(errors);
//       throw new BadRequestException(e);
//     }

//     return value;
//   }

//   private buildError(errors: ValidationError[]) {
//     const result = [];
//     errors.forEach((error) => {
//       const constraints = error.constraints;
//       if (constraints) {
//         Object.keys(constraints).forEach((key) => {
//           result.push(constraints[key]);
//         });
//       }
//     });
//     return result;
//   }
// }
