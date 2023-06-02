import * as Log4js from 'log4js';
// import * as StackTrace from 'stacktrace-js';
import * as Path from 'path';
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log() {
    console.log('');
  }
  warn() {
    console.log('');
  }
  error() {
    console.log('');
  }
}
