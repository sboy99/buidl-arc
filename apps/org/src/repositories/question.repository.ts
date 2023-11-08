import { Question } from '@app/common/models';
import { AbstractRepository } from '@app/infra/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionRepository extends AbstractRepository<Question> {
  protected readonly logger = new Logger(QuestionRepository.name);

  constructor(@InjectModel(Question.name) questionModel: Model<Question>) {
    super(questionModel);
  }
}
