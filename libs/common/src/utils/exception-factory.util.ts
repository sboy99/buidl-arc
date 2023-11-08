import { BadRequestException, ValidationError } from '@nestjs/common';

const serializeValidationError = (
  errors?: ValidationError[],
  fieldName = '',
): Record<string, string[]> => {
  let validationError: Record<string, string[]> = {};
  if (!errors || !errors?.length) return validationError;

  errors.forEach((error) => {
    validationError[`${fieldName && fieldName + '.'}${error.property}`] =
      error?.constraints ? Object.values(error.constraints) : [];

    validationError = {
      ...validationError,
      ...serializeValidationError(error.children, error.property),
    };
  });

  return validationError;
};

export const exceptionFactory = (error: ValidationError[]) => {
  const errors = serializeValidationError(error);
  console.log(errors);

  throw new BadRequestException(error);
};
