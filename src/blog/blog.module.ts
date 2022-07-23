import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogController } from './blog.controller';
import BlogEntity from './blog.pg.entity';
import { BlogService } from './blog.service';
import UploadFileEntity from './upload-file/file.upload.pg.entity';
import { FileUploadService } from './upload-file/file.upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity, UploadFileEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BlogController],
  providers: [BlogService, FileUploadService],
})
export class BlogModule {}
