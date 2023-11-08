import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStartupUpdateDto } from './dtos';
import { CreateStartupDto } from './dtos/create-startup.dto';
import { OrgService } from './org.service';

@Controller()
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  // @Post()
  // createOrg(@Body() payload: any) {
  //   return payload;
  // }

  @Post()
  createStartupProfile(@Body() createStartupDto: CreateStartupDto) {
    return this.orgService.createStartup(createStartupDto);
  }

  @Post('startup-update')
  createStartupUpdate(@Body() createStartupUpdateDto: CreateStartupUpdateDto) {
    return this.orgService.createStartupUpdate(createStartupUpdateDto);
  }

  @Get()
  listStartupProfiles() {
    return this.orgService.listStartupProfiles();
  }

  // @Post()
  // createQuestionnaire(@Body() payload: QuestionnaireDto) {
  //   return this.orgService.create(payload);
  // }

  // @Get()
  // listQuestionnaires() {
  //   return this.orgService.list();
  // }
}
