import { Column, Entity } from 'typeorm';
import BlogEntityBase from './blog.entity';

export interface IBlogEntity {
  id: number;

  title: string;

  description: string;

  attachment?: string;

  updatedAt: Date;

  createdAt: Date;
}

@Entity({ schema: 'default', name: 'Blog' })
export default class BlogEntity extends BlogEntityBase implements IBlogEntity {
  updatedAt: Date;
  createdAt: Date;
  attachment?: string;
  id: number;
  title: string;
}
