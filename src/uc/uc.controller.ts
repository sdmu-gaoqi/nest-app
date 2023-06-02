import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcService } from './uc.service';

@Controller('uc')
@ApiTags('uc')
export class UcController {
  constructor(private ucService: UcService) {}
  @ApiOperation({ summary: '获取Ip地址' })
  @Get('getStatus')
  getStatus() {
    return this.ucService.getLocate();
  }

  @Post('getProfile')
  @ApiOperation({ summary: '获取登录信息' })
  getProfile() {
    return this.ucService.getprofile();
  }
}
