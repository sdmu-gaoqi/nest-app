import * as Log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import * as Path from 'path';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
