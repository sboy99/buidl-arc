import { Profile } from '@app/common/models';
import { AbstractRepository } from '@app/infra/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository extends AbstractRepository<Profile> {
  protected readonly logger = new Logger(ProfileRepository.name);

  constructor(@InjectModel(Profile.name) profileModel: Model<Profile>) {
    super(profileModel);
  }
}
