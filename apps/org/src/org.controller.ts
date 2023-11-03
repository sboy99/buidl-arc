import { Controller, Get } from '@nestjs/common';
import { OrgService } from './org.service';

@Controller()
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  getHello(): string {
    return this.orgService.getHello();
  }
}
