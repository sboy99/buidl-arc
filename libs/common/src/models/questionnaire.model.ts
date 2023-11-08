import { AbstractDocument } from '@app/infra/database';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { QuestionnaireType, ReferenceType } from '../enums';
import { Question } from './question.model';

@Schema({
  validateBeforeSave: true,
  versionKey: false,
  timestamps: true,
})
export class Questionnaire extends AbstractDocument {
  @Prop({
    type: String,
    enum: QuestionnaireType,
  })
  type: QuestionnaireType;

  @Prop({
    type: String,
    enum: ReferenceType,
    default: ReferenceType.QUESTIONNAIRE,
  })
  refType?: ReferenceType;

  @Prop({
    type: SchemaTypes.String,
  })
  fieldName: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Question.name,
  })
  questions: Question[];
}

// schema
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);

// model
export const QuestionnaireModel: ModelDefinition = {
  name: Questionnaire.name,
  schema: QuestionnaireSchema,
};
