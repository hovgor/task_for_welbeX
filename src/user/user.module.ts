import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { HashPassword } from 'src/shared/password_hash/passwordHash';
import { UserValidator } from 'src/validaters/UserValidator';
import { UserController } from './user.controller';
import UserEntity from './user.pg.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    HashPassword,
    UserValidator,
    AuthService,
    JwtService,
  ],
})
export class UserModule {}
