import { QuestionType } from '@app/common/enums';
import { Question } from '@app/common/models';
import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class QuestionDto extends PickType(Question, ['fieldName', 'type']) {
  @IsString()
  @IsNotEmpty()
  fieldLabel: string;

  @IsString()
  @IsNotEmpty()
  fieldName: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;
}
