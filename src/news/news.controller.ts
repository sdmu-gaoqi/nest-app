import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AddNewDto } from './dto/addNew.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private newsServie: NewsService) {}
  @ApiOperation({ summary: '获取新闻列表' })
  @Get('list')
  getList() {
    return this.newsServie.getNews();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取新闻信息' })
  @ApiParam({ name: 'id', description: '新闻id', required: true, example: '1' })
  getNewDetail(@Param('id') id: string) {
    return this.newsServie.getNewDetail(id);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '添加新闻' })
  @ApiBody({ type: AddNewDto })
  addNew(@Body() body: AddNewDto) {
    return this.newsServie.addNew(body);
  }
}
