import { Module } from '@nestjs/common';
import { UcController } from './uc.controller';
import { UcService } from './uc.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [UcController],
  providers: [UcService],
  imports: [HttpModule],
})
export class UcModule {}
