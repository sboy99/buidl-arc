import { MONGO_URI, NODE_ENV } from '@app/common/env';

import { z } from 'zod';

export const DatabaseEnvSchema = z.object({
  NODE_ENV,
  MONGO_URI,
});

export type TDatabaseEnv = z.infer<typeof DatabaseEnvSchema>;
