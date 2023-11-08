import {
  LookupReferenceModel,
  LookupValueModel,
  OrgModel,
  ProfileModel,
  QuestionModel,
  QuestionnaireModel,
} from '@app/common/models';
import { DatabaseModule } from '@app/infra/database';
import { LoggerModule } from '@app/infra/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { OrgEnvSchema, TOrgEnv } from './env';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { OrgTranslateService } from './org.translate.service';
import {
  OrgRepository,
  ProfileRepository,
  QuestionRepository,
  QuestionnaireRepository,
} from './repositories';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: OrgEnvSchema,
      validate: (config) => OrgEnvSchema.parse(config),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ClientsModule],
      inject: [ConfigService<TOrgEnv>],
      useFactory: async (configService: ConfigService<TOrgEnv>) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([
      OrgModel,
      ProfileModel,
      QuestionnaireModel,
      QuestionModel,
      LookupValueModel,
      LookupReferenceModel,
    ]),
    LoggerModule,
  ],
  controllers: [OrgController],
  providers: [
    OrgService,
    OrgTranslateService,
    OrgRepository,
    ProfileRepository,
    QuestionnaireRepository,
    QuestionRepository,
  ],
})
export class OrgModule {}
