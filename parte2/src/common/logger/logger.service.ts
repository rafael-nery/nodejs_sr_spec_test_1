import { Injectable, LoggerService } from '@nestjs/common'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'

@Injectable()
export class AppLogger implements LoggerService {
  private logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), nestWinstonModuleUtilities.format.nestLike())
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        }),
        new winston.transports.File({ filename: 'logs/combined.log' })
      ]
    })
  }

  log(message: string) {
    this.logger.info(message)
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { trace })
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  debug?(message: string) {
    this.logger.debug(message)
  }

  verbose?(message: string) {
    this.logger.verbose(message)
  }
}
