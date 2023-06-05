import { ErrorExceptionFilter } from './error-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ErrorExceptionFilter()).toBeDefined();
  });
});
