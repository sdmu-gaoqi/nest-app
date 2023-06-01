import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AddNewDto } from './dto/addNew.dto';

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private newsServie: NewsService) {}
  @ApiOperation({ summary: '获取新闻列表' })
  @Get('list')
  getList() {
    return this.newsServie.getNews();
  }

  @Post('add')
  addNew(@Body() body: AddNewDto) {
    return this.newsServie.addNew(body);
  }
}
