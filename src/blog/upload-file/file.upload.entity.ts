import { IsDate, IsInt } from 'class-validator';
import BlogEntity from '../../blog/blog.pg.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import ApplListEntity from '../appl_list.pg.entity';

export class UploadFileEntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  original_name: string;

  @CreateDateColumn({ name: 'createed_at', nullable: true })
  @IsDate()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updated_at: Date;

  @ManyToOne(() => BlogEntity, (item) => item.id, {
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  blogId: number;

  @ManyToOne(() => BlogEntity, (blog) => blog.upload_files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  blog: BlogEntity;
}
