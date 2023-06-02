import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcService } from './uc.service';

@Controller('uc')
@ApiTags('uc')
export class UcController {
  constructor(private ucService: UcService) {}
  @ApiOperation({ summary: '获取状态信息' })
  @Get('getStatus')
  getStatus() {
    return this.ucService.getStatus();
  }
}
