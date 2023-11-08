import { Prop, Schema } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id?: Types.ObjectId;

  @Prop({
    type: SchemaTypes.UUID,
    unique: true,
  })
  uuid?: UUID;

  @Prop({
    type: SchemaTypes.Boolean,
    default: false,
  })
  isDeleted?: boolean;

  @Prop({
    type: SchemaTypes.Date,
    default: null,
  })
  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
