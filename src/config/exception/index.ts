import { HttpException } from '@nestjs/common';
import { HttpStatus } from '../interceptors';

export class NotDataException extends HttpException {
  constructor(content = '') {
    super(content || 'not data', HttpStatus.NOTDATA);
  }
}
