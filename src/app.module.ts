import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigService } from './config/config.service.database';

@Module({
  imports: [UserModule, ConfigModule, DatabaseModule],
  controllers: [],
  providers: [DatabaseConfigService],
})
export class AppModule {}
