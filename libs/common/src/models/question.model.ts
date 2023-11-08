import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { QuestionType, ReferenceType } from '../enums';

@Schema({
  validateBeforeSave: true,
  versionKey: false,
  timestamps: true,
})
export class Question extends AbstractDocument {
  @Prop({
    type: SchemaTypes.String,
    enum: QuestionType,
  })
  type: QuestionType;

  @Prop({
    type: SchemaTypes.String,
    enum: ReferenceType,
    default: ReferenceType.QUESTION,
  })
  refType?: ReferenceType;

  @Prop({
    type: SchemaTypes.String,
  })
  fieldName: string;

  @Prop({
    type: [SchemaTypes.String],
  })
  answers: string[];
}

// schema
export const QuestionSchema = SchemaFactory.createForClass(Question);

// model
export const QuestionModel: ModelDefinition = {
  name: Question.name,
  schema: QuestionSchema,
};
