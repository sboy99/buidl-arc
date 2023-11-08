import { User } from '@app/common/models';
import { getSelects } from '@app/common/utils';

export const UserDefaultSelects = getSelects<User>(
  'id',
  'firstName',
  'lastName',
  'avatar',
  'createdAt',
  'updatedAt',
);

export const UserPropulateSelects = getSelects<User>(
  'id',
  'firstName',
  'lastName',
  'avatar',
);
