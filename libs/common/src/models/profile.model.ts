import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ProfileType, ReferenceType } from '../enums';
import { Questionnaire } from './questionnaire.model';

@Schema({
  validateBeforeSave: true,
  versionKey: false,
  timestamps: true,
})
export class Profile extends AbstractDocument {
  @Prop({
    type: String,
    enum: ProfileType,
  })
  type: ProfileType;

  @Prop({
    type: String,
    enum: ReferenceType,
    default: ReferenceType.PROFILE,
  })
  refType?: ReferenceType;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Questionnaire.name,
  })
  questionnaires: Questionnaire[];
}

// schema
export const ProfileSchema = SchemaFactory.createForClass(Profile);

// model
export const ProfileModel: ModelDefinition = {
  name: Profile.name,
  schema: ProfileSchema,
};
