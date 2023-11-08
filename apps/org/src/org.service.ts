import { Injectable } from '@nestjs/common';
import { CreateStartupUpdateDto } from './dtos';
import { CreateStartupDto } from './dtos/create-startup.dto';
import { OrgTranslateService } from './org.translate.service';
import { QuestionRepository } from './repositories/question.repository';
import { QuestionnaireRepository } from './repositories/questionnaire.repository';

@Injectable()
export class OrgService {
  constructor(
    private readonly questionnaireRepo: QuestionnaireRepository,
    private readonly questionRepo: QuestionRepository,
    private readonly orgTranslateService: OrgTranslateService,
  ) {}

  async createStartup(dto: CreateStartupDto) {
    return this.orgTranslateService.createStartup(dto);
  }

  async listStartupProfiles() {
    return this.orgTranslateService.list();
  }

  async createStartupUpdate(dto: CreateStartupUpdateDto) {
    return this.orgTranslateService.createStartupUpdate(dto);
  }

  async listStartupUpdates() {
    return this.orgTranslateService.list();
  }
}
