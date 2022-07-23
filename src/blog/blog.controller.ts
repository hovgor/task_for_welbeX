import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AuthService } from 'src/auth/auth.service';
import { v4 as uuidv4 } from 'uuid';
import BlogEntity from './blog.pg.entity';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create.blog.dto';
import { FileUploadService } from './upload-file/file.upload.service';

export const storage1 = {
  storage: diskStorage({
    destination: `./upload-file/blogs`,
    filename: async (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  findAll(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private authService: AuthService,
    private readonly blogService: BlogService,
    private fileUploadService: FileUploadService,
  ) {}

  // create task
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachment', maxCount: 3 }], storage1),
  )
  @Post('/')
  async createBlog(
    @Req() req,
    @Res() res: Response,
    @UploadedFiles() files,
    @Body() body: CreateBlogDto,
  ) {
    try {
      const token = (req.headers['authorization'] + '').split(' ')[1];
      const payload = await this.authService.decodeToken(token);
      const user = await this.authService.validateUser(payload, token);

      if (!(await this.authService.userVerify(user))) {
        throw new UnauthorizedException('User is not unauthorized!!!');
      }

      const blog: any = await this.blogService.createBlog({
        title: body.title,
        description: body.description,
      });
      await this.fileUploadService.addFile(files.attachment, blog.id);
      return res.status(HttpStatus.CREATED).json({
        success: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // delete tas
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Delete(':id')
  async deleteTask(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const token = (req.headers['authorization'] + '').split(' ')[1];
      const payload = await this.authService.decodeToken(token);
      const user = await this.authService.validateUser(payload, token);
      if (!(await this.authService.userVerify(user))) {
        throw new UnauthorizedException('User is not unauthorized!!!');
      }
      const getTask = await this.blogService.getBlog(id);
      if (!getTask) {
        throw new NotFoundException('Task is not exist!!!');
      }
      await this.blogService.deleteBlog(getTask.id);
      return res.status(HttpStatus.NO_CONTENT).json({
        success: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
