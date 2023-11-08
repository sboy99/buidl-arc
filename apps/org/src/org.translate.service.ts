import { OrgType, ProfileType, QuestionnaireType } from '@app/common/enums';
import { Org, Question, Questionnaire } from '@app/common/models';
import { ConvertToMetaType } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { CreateStartupUpdateDto, createStartupUpdateMetadata } from './dtos';
import {
  CreateStartupDto,
  createStartupMetadata,
} from './dtos/create-startup.dto';
import {
  OrgRepository,
  ProfileRepository,
  QuestionRepository,
  QuestionnaireRepository,
} from './repositories';

@Injectable()
export class OrgTranslateService {
  constructor(
    private readonly orgRepo: OrgRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly questionnaireRepo: QuestionnaireRepository,
    private readonly questionRepo: QuestionRepository,
  ) {}

  async createStartup(createStartupDto: CreateStartupDto) {
    const questionnaires: Questionnaire[] = await this.createQuestionnaires(
      QuestionnaireType.STARTUP_ONBOARDING,
      createStartupDto,
      createStartupMetadata,
    );

    // create profile
    const profile = await this.profileRepo.create({
      type: ProfileType.STARTUP,
      questionnaires,
    });

    // create org
    const org = await this.orgRepo.create({
      type: OrgType.STARTUP,
      profiles: [profile],
    });
    return org;
  }

  async list() {
    const orgList = await this.orgRepo.list();
    return orgList.map((org) => this.translateToClient(org));
  }

  async createStartupUpdate(createStartupUpdateDto: CreateStartupUpdateDto) {
    const questionnaires: Questionnaire[] = await this.createQuestionnaires(
      QuestionnaireType.STARTUP_UPDATE,
      createStartupUpdateDto,
      createStartupUpdateMetadata,
    );

    // update startup profile
    const profile = await this.profileRepo.findOneAndUpdate(
      {
        _id: createStartupUpdateDto.profileId,
      },
      {
        $addToSet: {
          questionnaires,
        },
      },
    );

    return profile;
  }

  private async createQuestionnaires<TDto extends object>(
    type: QuestionnaireType,
    dto: TDto,
    metadata: ConvertToMetaType<TDto>,
  ): Promise<Questionnaire[]> {
    const questionnaires: Questionnaire[] = [];

    // create questions
    for (const questionnaireName in metadata) {
      const questions: Question[] = [];
      for (const fieldName in dto[questionnaireName]) {
        const question = await this.questionRepo.create({
          fieldName,
          answers: [JSON.stringify(dto?.[questionnaireName]?.[fieldName])],
          type: metadata[questionnaireName][fieldName],
        });
        questions.push(question);
      }

      // create questionnaire
      const questionnaire = await this.questionnaireRepo.create({
        fieldName: questionnaireName,
        type,
        questions,
      });
      questionnaires.push(questionnaire);
    }

    return questionnaires;
  }

  private seriaizeQuestions(questions: Question[]): Record<string, unknown> {
    return questions.reduce<Record<string, unknown>>((acc, curr) => {
      acc[curr.fieldName] = JSON.parse(curr.answers[curr.answers.length - 1]);
      return acc;
    }, {});
  }

  private serializeQuestionnaires(
    questionnaires: Questionnaire[],
  ): Record<string, unknown> {
    const lookupHash: Record<string, boolean> = {};

    return questionnaires.reduce<Record<string, unknown>>((acc, curr) => {
      // serialize questions
      const serializedQuestions = this.seriaizeQuestions(curr.questions);

      // append timestamps
      serializedQuestions['createdAt'] = curr.createdAt;
      serializedQuestions['updatedAt'] = curr.updatedAt;

      if (lookupHash[curr.fieldName]) {
        acc[curr.fieldName] = [
          ...Array.from(acc[curr.fieldName] as object[]),
          serializedQuestions,
        ];
      } else acc[curr.fieldName] = [serializedQuestions];

      lookupHash[curr.fieldName] = true;
      return acc;
    }, {});
  }

  private translateToClient(org: Org) {
    return {
      id: org._id,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
      profiles: org.profiles.map((profile) => ({
        id: profile._id,
        type: profile.type,
        ...this.serializeQuestionnaires(profile.questionnaires),
      })),
    };
  }
}
