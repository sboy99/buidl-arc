import { Org, Profile, Question, Questionnaire } from '@app/common/models';
import { AbstractRepository } from '@app/infra/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrgRepository extends AbstractRepository<Org> {
  protected readonly logger = new Logger(OrgRepository.name);

  constructor(@InjectModel(Org.name) readonly orgModel: Model<Org>) {
    super(orgModel);
  }

  list() {
    return this.orgModel.find(
      {},
      {},
      {
        populate: [
          {
            path: 'profiles',
            model: Profile.name,
            match: {
              isDeleted: false,
            },
            populate: [
              {
                path: 'questionnaires',
                model: Questionnaire.name,
                match: {
                  isDeleted: false,
                },
                populate: [
                  {
                    path: 'questions',
                    model: Question.name,
                    match: {
                      isDeleted: false,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    );
  }
}
