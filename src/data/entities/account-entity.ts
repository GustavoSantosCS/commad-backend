import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { AccountModel } from '@/domain/models';
import { EstablishmentEntity } from './establishment-entity';
import { RequestProductEntity } from './request-product-entity';
import { RequestMusicEntity } from './request-music-entity';
import { UserEntity } from './user-entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, client => client.accounts)
  @JoinColumn({ name: 'client_id' })
  client: UserEntity;

  @ManyToOne(() => EstablishmentEntity, establishment => establishment.accounts)
  @JoinColumn({ name: 'establishment_id' })
  establishment: EstablishmentEntity;

  @OneToMany(
    () => RequestProductEntity,
    requestsProduct => requestsProduct.account
  )
  requestsProduct: RequestProductEntity[];

  @OneToMany(() => RequestMusicEntity, requestsMusic => requestsMusic.account)
  requestsMusic: RequestMusicEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'closed_at' })
  closedAt: Date;

  constructor(accountModel: AccountModel) {
    Object.assign(this, accountModel);
  }
}