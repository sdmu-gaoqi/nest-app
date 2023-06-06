import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AddNewDto } from './dto/addNew.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNewDto } from './dto/updateNew.dto';
import { NotDataException } from 'src/config/exception';
import { HttpStatus } from 'src/config/interceptors';
import RbacGuard from 'src/guaid/rbac.guard';
import { MyLogger } from 'src/utils/log4js';
import {
  ListParamsDecorator,
  PageResult,
} from 'src/decorator/listParams.decorator';
import { ListPageInterceptor } from 'src/interceptor/listPage.interceptor';

@Controller('news')
@ApiTags('news')
@ApiBearerAuth()
export class NewsController {
  constructor(private newsServie: NewsService) {}

  @Get('list')
  @ApiOperation({ summary: '获取新闻列表' })
  @ApiQuery({ name: 'page', example: '1', description: '页码' })
  @ApiQuery({ name: 'pageSize', example: '10', description: '码数' })
  @ApiQuery({
    name: 'orderBy',
    required: false,
  })
  @ApiQuery({
    name: 'orderValue',
    required: false,
    description: 'DESC | ASC',
  })
  @ApiQuery({
    name: 'time',
    required: false,
    description: '以天为单位的时间戳',
    example: 1686042920015,
  })
  @UseInterceptors(new ListPageInterceptor())
  getList(@ListParamsDecorator() params: PageResult) {
    return this.newsServie.getNews(params.pageParams);
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
  // @UseGuards(new RbacGuard())
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '添加新闻' })
  @ApiBody({ type: AddNewDto })
  addNew(@Body() body: AddNewDto) {
    return this.newsServie.addNew(body);
  }
}
