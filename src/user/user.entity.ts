import { IsDate, IsEmail, IsInt, IsString, Length } from 'class-validator';
import { UserRoles } from '../types/roles';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class UserEntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ type: 'varchar' })
  @IsString()
  @Length(1, 12)
  name: string;

  @Column({ type: 'varchar', unique: false })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', default: 0, nullable: true })
  password: string;

  @Column({ type: 'smallint', default: UserRoles.driver })
  @IsInt()
  role: UserRoles;

  @Column({ type: 'varchar', unique: true, nullable: true })
  @IsString()
  public token: string;

  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  @IsDate()
  public updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  private putUpdateDate() {
    this.updatedAt = new Date(Date.now());
  }
}
