import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/feature/news';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly goodRepository: Repository<News>,
  ) {}
  getNews(params) {
    return this.goodRepository.findAndCount(params);
  }
  addNew(data) {
    return this.goodRepository.save({ ...data, createTime: +new Date() });
  }

  getNewDetail(id) {
    // one
    // return this.goodRepository.findOneBy({ id });

    // two
    const Sql = this.goodRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getSql();
    const result = this.goodRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    return result;
  }

  updateNew(id, content) {
    return this.goodRepository.update(id, { content });
  }
}
