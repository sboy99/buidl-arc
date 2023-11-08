import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { LookupCategory } from '../enums';
import { LookupReference } from './lookup-reference.model';

@Schema({
  validateBeforeSave: true,
})
export class LookupValue extends AbstractDocument {
  @Prop({
    type: SchemaTypes.String,
    enum: LookupCategory,
  })
  category: LookupCategory;

  @Prop({
    type: SchemaTypes.String,
  })
  type: string;

  @Prop({
    type: SchemaTypes.String,
  })
  value: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: LookupReference.name,
  })
  references: LookupReference[];
}

// schema
export const LookupValueSchema = SchemaFactory.createForClass(LookupValue);

// model
export const LookupValueModel: ModelDefinition = {
  name: LookupValue.name,
  schema: LookupValueSchema,
};
