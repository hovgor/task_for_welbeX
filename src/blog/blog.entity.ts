import { IsDate, IsInt } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UploadFileEntity from './upload-file/file.upload.pg.entity';

export default class BlogEntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  attachment?: string;

  @CreateDateColumn({ name: 'createed_at', nullable: true })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  @IsDate()
  updated_at: Date;

  @OneToMany(() => UploadFileEntity, (upload) => upload.blogId, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinTable()
  upload_files: UploadFileEntity[];
}
