import { Injectable } from '@nestjs/common';

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
    this.newsList.push({ ...data, id: this.newsList.length + 1 });
  }
}
