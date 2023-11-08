import { Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.document';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = await this.model.create({
      ...document,
      _id: new Types.ObjectId(),
      uuid: randomUUID(),
    });
    return createdDocument.toObject();
  }

  async createMany(documents: Omit<TDocument, '_id'>[]): Promise<TDocument[]> {
    const createdDocuments = await this.model.create(
      documents.map((doc) => ({
        ...doc,
        _id: new Types.ObjectId(),
        uuid: randomUUID(),
      })),
    );
    return createdDocuments.map((createdDocument) =>
      createdDocument.toObject(),
    );
  }

  async list(
    filterQuery: FilterQuery<TDocument>,
    queryOptions?: QueryOptions<TDocument>,
  ): Promise<TDocument[]> {
    return this.model
      .find({ ...filterQuery, isDeleted: false }, undefined, queryOptions)
      .lean<TDocument[]>(true);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne({ ...filterQuery, isDeleted: false })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate({ ...filterQuery, isDeleted: false }, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndSoftDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(
        { ...filterQuery, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model
      .findOneAndDelete({ ...filterQuery, isDeleted: false })
      .lean<TDocument>(true);
  }
}
