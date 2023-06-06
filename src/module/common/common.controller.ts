import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';

@Controller('common')
@ApiTags('common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  @ApiOperation({ summary: '获取用户状态' })
  @Get('getStatus')
  getStatus() {
    return this.commonService.getLocate();
  }

  @Post('getProfile')
  @ApiOperation({ summary: '获取登录信息' })
  getProfile() {
    return this.commonService.getprofile();
  }
}
