import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export class AbstractResourceEntity<T> extends AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'deleted_at', default: null, nullable: true })
  deletedAt?: Date | null;

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: boolean;

  constructor(entity: Partial<T>) {
    super(entity);
  }
}
