import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { EstablishmentModel } from '@/domain/models';
import { EstablishmentImageEntity } from './establishment-image-entity';
import { UserEntity } from './user-entity';

@Entity('establishments')
export class EstablishmentEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  isOpen: boolean;

  @ManyToOne(() => UserEntity, user => user.establishments)
  @JoinColumn()
  manager: UserEntity;

  @OneToOne(() => EstablishmentImageEntity)
  @JoinColumn()
  image: EstablishmentImageEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: Date;

  constructor(establishment: EstablishmentModel) {
    Object.assign(this, establishment);
  }
}