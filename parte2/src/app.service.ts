// src/app.service.ts
import { Injectable, Logger } from '@nestjs/common'
import * as Sentry from '@sentry/nestjs'

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name)

  /**
   * Retorna uma mensagem de saudação.
   * @returns {string} Mensagem de saudação.
   */
  getHello(): string {
    this.logger.log('Chamando método getHello')
    return 'NODEJS SR SPEC TEST - PARTE 2: Prática'
  }

  /**
   * Método de exemplo que gera um erro intencional para teste do Sentry.
   */
  triggerError(): void {
    this.logger.warn('Chamando método triggerError')
    try {
      throw new Error('Erro intencional para teste do Sentry')
    } catch (error) {
      this.logger.error('Erro capturado em triggerError', error.stack)
      Sentry.captureException(error)
      throw error
    }
  }
}
