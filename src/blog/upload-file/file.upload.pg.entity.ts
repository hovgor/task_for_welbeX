import { Entity } from 'typeorm';
import { UploadFileEntityBase } from './file.upload.entity';

export interface IUploadFileEntity {
  id: number;
  path: string;
  createed_at: Date;
  updated_at: Date;
  blogId: number;
}
@Entity({ schema: 'default', name: 'Upload_file' })
export default class UploadFileEntity
  extends UploadFileEntityBase
  implements IUploadFileEntity
{
  id: number;
  path: string;
  createed_at: Date;
  updated_at: Date;
  blogId: number;
}
