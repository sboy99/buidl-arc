import { Questionnaire } from '@app/common/models';
import { AbstractRepository } from '@app/infra/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionnaireRepository extends AbstractRepository<Questionnaire> {
  protected readonly logger = new Logger(QuestionnaireRepository.name);

  constructor(
    @InjectModel(Questionnaire.name) questionnaireModel: Model<Questionnaire>,
  ) {
    super(questionnaireModel);
  }
}
