import { UserRoles } from '../types/roles';
import { Column, Entity } from 'typeorm';
import UserEntityBase from './user.entity';

export interface IUserEntity {
  id: number;

  name: string;

  token: string;

  password: string;

  email: string;

  role: UserRoles;

  updatedAt: Date;

  createdAt: Date;
}

@Entity({ schema: 'default', name: 'User' })
export default class UserEntity extends UserEntityBase implements IUserEntity {
  @Column({ type: 'varchar', nullable: true })
  public firebaseToken: string;
}
