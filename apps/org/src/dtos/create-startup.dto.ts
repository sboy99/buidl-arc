import { QuestionType } from '@app/common/enums';
import { ConvertToMetaType } from '@app/common/types';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class BasicQuestionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  startupInOneTweet: string;
}

export class ProblemQuestionDto {
  @IsString()
  @IsNotEmpty()
  describe: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class ProductQuestionDto {
  @IsString({ each: true })
  @IsNotEmpty()
  productStage: string[];
}

export class CreateStartupDto {
  @ValidateNested()
  @Type(() => BasicQuestionDto)
  @IsNotEmptyObject()
  basic: BasicQuestionDto;

  @ValidateNested()
  @Type(() => ProblemQuestionDto)
  @IsNotEmptyObject()
  problem: ProblemQuestionDto;

  @ValidateNested()
  @Type(() => ProductQuestionDto)
  @IsNotEmptyObject()
  product: ProductQuestionDto;
}

export const createStartupMetadata: ConvertToMetaType<CreateStartupDto> = {
  basic: {
    name: QuestionType.STRING,
    startupInOneTweet: QuestionType.STRING,
  },
  problem: {
    describe: QuestionType.STRING,
    reason: QuestionType.STRING,
  },
  product: {
    productStage: QuestionType.STRING_ARRAY,
  },
};
