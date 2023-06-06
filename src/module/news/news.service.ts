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
  getNews() {
    return this.goodRepository.find();
  }
  addNew(data) {
    return this.goodRepository.save({ ...data });
  }

  getNewDetail(id) {
    return this.goodRepository.findOneBy({ id });
  }

  updateNew(id, content) {
    return this.goodRepository.update(id, { content });
  }
}
