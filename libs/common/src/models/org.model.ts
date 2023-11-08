import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { OrgType, ReferenceType } from '../enums';
import { Profile } from './profile.model';

@Schema({
  validateBeforeSave: true,
})
export class Org extends AbstractDocument {
  @Prop({
    type: String,
    enum: OrgType,
  })
  type: OrgType;

  @Prop({
    type: String,
    enum: ReferenceType,
    default: ReferenceType.ORG,
  })
  refType?: ReferenceType;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Profile.name,
  })
  profiles: Profile[];
}

// schema
export const OrgSchema = SchemaFactory.createForClass(Org);

// model
export const OrgModel: ModelDefinition = {
  name: Org.name,
  schema: OrgSchema,
};
