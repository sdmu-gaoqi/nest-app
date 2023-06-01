import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
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
    return this.newsList;
  }
  addNew(data) {
    const newData = { ...data, id: this.newsList.length + 1 };
    this.newsList.push(newData);
    return newData;
  }

  getNewDetail(id) {
    const newData = this.newsList.find((item) => item.id === Number(id));
    if (!newData) {
      throw new BadRequestException('新闻不存在');
    }
    return newData;
  }
}
