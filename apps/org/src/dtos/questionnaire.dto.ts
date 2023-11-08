import { QuestionnaireType } from '@app/common/enums';
import { Question, Questionnaire } from '@app/common/models';
import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionDto } from './question.dto';

export class QuestionnaireDto extends PickType(Questionnaire, [
  'fieldName',
  'questions',
  'type',
]) {
  @IsString()
  @IsNotEmpty()
  fieldName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => QuestionDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    each: true,
  })
  questions: Question[];

  @IsEnum(QuestionnaireType)
  @IsNotEmpty()
  type: QuestionnaireType;
}
