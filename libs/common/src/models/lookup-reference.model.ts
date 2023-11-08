import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ReferenceType } from '../enums';

@Schema({
  versionKey: false,
})
export class LookupReference extends AbstractDocument {
  @Prop({
    type: SchemaTypes.String,
    enum: ReferenceType,
  })
  type: ReferenceType;

  @Prop({
    type: SchemaTypes.String,
  })
  value: string;
}

// schema
export const LookupReferenceSchema =
  SchemaFactory.createForClass(LookupReference);

// model
export const LookupReferenceModel: ModelDefinition = {
  name: LookupReference.name,
  schema: LookupReferenceSchema,
};
