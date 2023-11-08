import { QuestionType } from '@app/common/enums';
import { ConvertToMetaType } from '@app/common/types';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CategoricalUpdateDto {
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  details: string;
}

export class StartupUpdateQuestionDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  morale: number;

  @IsString()
  @IsNotEmpty()
  highlight: string;

  @ValidateNested()
  @Type(() => CategoricalUpdateDto)
  @IsNotEmptyObject({}, { each: true })
  @IsOptional()
  categoricalUpdates?: CategoricalUpdateDto[];
}

export class CreateStartupUpdateDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @ValidateNested()
  @Type(() => StartupUpdateQuestionDto)
  @IsNotEmptyObject()
  startupUpdate: StartupUpdateQuestionDto;
}

export const createStartupUpdateMetadata: ConvertToMetaType<
  Omit<CreateStartupUpdateDto, 'profileId'>
> = {
  startupUpdate: {
    morale: QuestionType.NUMBER,
    highlight: QuestionType.STRING,
    categoricalUpdates: QuestionType.OBJECT_ARRAY,
  },
};
