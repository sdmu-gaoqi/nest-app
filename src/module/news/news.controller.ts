import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AddNewDto } from './dto/addNew.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNewDto } from './dto/updateNew.dto';
import { NotDataException } from 'src/config/exception';
import { HttpStatus } from 'src/config/interceptors';

@Controller('news')
@ApiTags('news')
@ApiBearerAuth()
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

  @Put(':id')
  @ApiOperation({ summary: '更新新闻内容' })
  @ApiParam({ name: 'id', description: '新闻id', required: true, example: '1' })
  updateNew(@Param('id') id: string, @Body() body: UpdateNewDto) {
    return this.newsServie.updateNew(id, body.content);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '添加新闻' })
  @ApiBody({ type: AddNewDto })
  addNew(@Body() body: AddNewDto) {
    return this.newsServie.addNew(body);
  }
}
