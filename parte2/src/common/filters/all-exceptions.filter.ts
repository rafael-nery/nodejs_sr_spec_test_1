import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { WithSentry } from '@sentry/nestjs'

/**
 * Filtro global para capturar e tratar todas as exceções não tratadas na aplicação.
 *
 * Esta classe implementa a interface `ExceptionFilter` do NestJS e utiliza o decorador `@Catch()`
 * para interceptar todas as exceções lançadas durante o processamento das requisições.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @WithSentry()
  catch(exception: unknown, host: ArgumentsHost) {
    // Obtém o contexto HTTP a partir do ArgumentsHost
    const ctx: HttpArgumentsHost = host.switchToHttp()

    // Obtém o objeto de resposta (response) a partir do contexto HTTP
    const response = ctx.getResponse()

    // Obtém o objeto de requisição (request) a partir do contexto HTTP
    const request = ctx.getRequest()

    // Determina o status HTTP da resposta com base na exceção
    const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // Determina a mensagem de erro com base na exceção
    const message: string | object = exception instanceof HttpException ? exception.getResponse() : 'Erro interno do servidor'

    // Estrutura a resposta de erro que será enviada ao cliente
    response.status(status).json({
      timestamp: new Date().toISOString(), // Timestamp do erro
      path: request.url, // Rota onde ocorreu o erro
      error: message // Mensagem de erro
    })
  }
}
