import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus } from 'src/config/interceptors';
import { News } from 'src/feature/news';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly goodRepository: Repository<News>,
  ) {}
  public newsList = [
    { id: 1, title: 'title', content: 'content' },
    { id: 2, title: 'title', content: 'content' },
    { id: 3, title: 'title', content: 'content' },
    { id: 4, title: 'title', content: 'content' },
    { id: 5, title: 'title', content: 'content' },
    { id: 6, title: 'title', content: 'content' },
    { id: 7, title: 'title', content: 'content' },
    { id: 8, title: 'title', content: 'content' },
    { id: 9, title: 'title', content: 'content' },
    { id: 10, title: 'title', content: 'content' },
  ];
  getNews() {
    return this.goodRepository.find();
  }
  addNew(data) {
    return this.goodRepository.save({ ...data, id: this.newsList.length + 1 });
  }

  getNewDetail(id) {
    const newData = this.newsList.find((item) => item.id === Number(id));
    if (!newData) {
      return {
        code: HttpStatus.NOTDATA,
        message: 'not Data',
      };
    }
    return newData;
  }

  updateNew(id, content) {
    const newData = this.newsList.find((item) => item.id === Number(id));
    if (!newData) {
      throw new BadRequestException();
    }
    newData.content = content;
    return newData;
  }
}
