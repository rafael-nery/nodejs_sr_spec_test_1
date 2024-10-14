import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as morgan from 'morgan';

/**
 * Middleware personalizado para logging de requisições HTTP usando o Morgan.
 *
 * Este middleware registra detalhes de cada requisição HTTP recebida pela aplicação,
 * como método, URL, status da resposta e tempo de resposta.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * Instância do Morgan configurada para formatar as mensagens de log.
   *
   * A formatação personalizada inclui:
   * - Timestamp da requisição.
   * - Método HTTP (GET, POST, etc.).
   * - URL da requisição.
   * - Status da resposta.
   * - Tempo de resposta em milissegundos.
   */
  private logger = morgan(function (tokens, req, res) {
    return [
      `[${new Date().toISOString()}]`, // Timestamp da requisição
      tokens.method(req, res),         // Método HTTP
      tokens.url(req, res),            // URL da requisição
      tokens.status(req, res),         // Status da resposta
      '-',
      tokens['response-time'](req, res), // Tempo de resposta
      'ms',
    ].join(' ');
  });

  /**
   * Método chamado para processar a requisição.
   *
   * Este método integra o middleware Morgan configurado para registrar
   * os detalhes da requisição e, em seguida, chama a próxima função middleware na cadeia.
   *
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @param next - Função para chamar o próximo middleware.
   */
  use(req: Request, res: Response, next: () => void) {
    this.logger(req, res, next);
  }
}
