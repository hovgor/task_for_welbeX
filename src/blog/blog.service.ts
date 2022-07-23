import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BlogEntity from './blog.pg.entity';
import { CreateBlodDbDto } from './dto/create.blog.db.dto';
import { CreateBlogDto } from './dto/create.blog.dto';
import UploadFileEntity from './upload-file/file.upload.pg.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
  ) {}

  // create blog
  async createBlog(data) {
    try {
      return await this.blogRepository.save(this.blogRepository.create(data));
    } catch (error) {
      Logger.log('error: create blog => ', error);
      throw error;
    }
  }

  // delete blog
  async deleteBlog(id: number) {
    try {
      await this.blogRepository.delete(id);
    } catch (error) {
      Logger.log('error: delete blog => ', error);
      throw error;
    }
  }

  // get blog
  async getBlog(id: number) {
    try {
      const blog = await this.blogRepository
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.upload_files', 'upload_fileId')
        .andWhere('upload_fileId.blogId = :id', { id })
        .where('blog.id = :id', { id })
        .getOne();
      return blog;
    } catch (error) {
      Logger.log('error: get blog => ', error);
      throw error;
    }
  }
}
