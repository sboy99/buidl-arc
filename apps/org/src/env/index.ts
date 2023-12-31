import {
  COOKIE_SECRET,
  HTTP_PORT,
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_SECRET,
} from '@app/common/env';
import { DatabaseEnvSchema } from '@app/infra/database';
import { z } from 'zod';

export const OrgEnvSchema = DatabaseEnvSchema.extend({
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
  COOKIE_SECRET,
  JWT_SECRET,
  HTTP_PORT,
});

export type TOrgEnv = z.infer<typeof OrgEnvSchema>;
