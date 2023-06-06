import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/feature/user';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
