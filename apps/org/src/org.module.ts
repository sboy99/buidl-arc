import { MicroServices, Queues } from '@app/common/constants';
import { DatabaseModule } from '@app/infra/database';
import { LoggerModule } from '@app/infra/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrgEnvSchema, TOrgEnv } from './env';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: OrgEnvSchema,
      validate: (config) => OrgEnvSchema.parse(config),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: MicroServices.AUTH_CLIENT,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<TOrgEnv>) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
              queue: Queues.AUTH_QUEUE,
            },
          }),
        },
      ],
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
    LoggerModule,
  ],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
