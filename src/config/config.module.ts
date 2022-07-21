import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DatabaseConfigService } from './config.service.database';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: (): ConfigService => {
        return new ConfigService(`${process.cwd()}/.env`);
      },
    },
    DatabaseConfigService,
  ],
  exports: [ConfigService, DatabaseConfigService],
})
export class ConfigModule {}
