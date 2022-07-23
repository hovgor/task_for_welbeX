import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigService } from './config/config.service.database';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, ConfigModule, DatabaseModule, BlogModule],
  controllers: [],
  providers: [DatabaseConfigService],
})
export class AppModule {}
