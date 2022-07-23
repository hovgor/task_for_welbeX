import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import UploadFileEntity from './file.upload.pg.entity';
import { Repository } from 'typeorm';
export class FileUploadService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private uploadFileRepasitory: Repository<UploadFileEntity>,
  ) {}

  async addFile(file: any, appId: number) {
    try {
      if (!file) {
        return null;
      }
      let id: UploadFileEntity;
      if (file.length > 0) {
        for (let i = 0; i < file.length; ++i) {
          id = await this.uploadFileRepasitory.save(
            this.uploadFileRepasitory.create({
              blogId: appId,
              path: process.cwd() + '/' + file[i].path,
              original_name: file[i].originalname,
            }),
          );
        }
      } else {
        id = await this.uploadFileRepasitory.save(
          this.uploadFileRepasitory.create({
            blogId: appId,
            path: process.cwd() + '/' + file.path,
            original_name: file.originalname,
          }),
        );
      }
      return id;
    } catch (error) {
      Logger.log('error=> add file name', error);
      throw error;
    }
  }

  // add file for clients
  async addFileForClients(file: any, appId: number) {
    try {
      if (!file) {
        return null;
      }
      const id: UploadFileEntity = await this.uploadFileRepasitory.save(
        this.uploadFileRepasitory.create({
          blogId: appId,
          path: process.cwd() + '/' + file[0].path,
          original_name: file[0].originalname,
        }),
      );
      return id;
    } catch (error) {
      Logger.log('error=> add file for clients', error);
      throw error;
    }
  }

  // add file path for tasks
  async addFileForTasks(file: any, appId: number) {
    try {
      if (!file) {
        return null;
      }
      let id: UploadFileEntity;
      if (file.length > 0) {
        for (let i = 0; i < file.length; ++i) {
          id = await this.uploadFileRepasitory.save(
            this.uploadFileRepasitory.create({
              blogId: appId,
              path: process.cwd() + '/' + file[i].path,
              original_name: file[i].originalname,
            }),
          );
        }
      } else {
        id = await this.uploadFileRepasitory.save(
          this.uploadFileRepasitory.create({
            blogId: appId,
            path: process.cwd() + '/' + file.path,
            original_name: file.originalname,
          }),
        );
      }
      return id;
    } catch (error) {
      Logger.log('error=> add file name for blog', error);
      throw error;
    }
  }

  // update upload file table
  async updateUploadFileTable(id: number, data: any) {
    try {
      return await this.uploadFileRepasitory.update({ id }, data);
    } catch (error) {
      Logger.log('error=> update upload file ', error);
      throw error;
    }
  }
  // delete files in database and file sistem
  async deleteFileName(id: number) {
    try {
      const file = await this.uploadFileRepasitory.find({
        where: {
          blogId: id,
        },
      });

      for (let i = 0; i < file.length; ++i) {
        const deletedId: number = file[i].id;
        const path: string = file[i].path;
        fs.unlinkSync(path);
        await this.uploadFileRepasitory.delete(deletedId);
      }
    } catch (error) {
      Logger.log('error=> delete file name', error);
      throw error;
    }
  }
}
