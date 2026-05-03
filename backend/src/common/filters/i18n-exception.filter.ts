import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessages } from '../constants/error-messages.constant';

@Catch(HttpException)
export class I18nExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(I18nExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determine requested language, defaulting to 'en'
    const langHeader = request.headers['lang'] as string;
    const supportedLangs = ['en', 'ru', 'tj'];
    const currentLang =
      langHeader && supportedLangs.includes(langHeader.toLowerCase())
        ? (langHeader.toLowerCase() as 'en' | 'ru' | 'tj')
        : 'en';

    const exceptionResponse: unknown = exception.getResponse();

    // Extract original message(s) from exception response
    const rawMessage: string | string[] =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof exceptionResponse === 'object' &&
            exceptionResponse !== null &&
            'message' in exceptionResponse
          ? (exceptionResponse as { message: string | string[] }).message
          : exception.message;

    let translatedMessage: string | string[] = rawMessage;

    // Helper to translate a single string message
    const translateString = (msg: string): string => {
      // Find matching key in ErrorMessages
      for (const [key, translations] of Object.entries(ErrorMessages)) {
        if (
          key === msg || // strict key match (e.g. 'NO_INIT_DATA')
          translations.en === msg || // match default english
          translations.ru === msg ||
          translations.tj === msg
        ) {
          return translations[currentLang];
        }
      }
      return msg; // return original if no translation found
    };

    if (Array.isArray(rawMessage)) {
      translatedMessage = rawMessage.map((m) => translateString(m));
    } else if (typeof rawMessage === 'string') {
      translatedMessage = translateString(rawMessage);
    }

    const jsonResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: translatedMessage,
    };

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${JSON.stringify(translatedMessage)}`,
    );

    response.status(status).json(jsonResponse);
  }
}
