import { Injectable } from '@nestjs/common';

@Injectable()
export class OrgService {
  getHello(): string {
    return 'Hello World!';
  }
}
