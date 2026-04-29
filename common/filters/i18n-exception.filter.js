"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var I18nExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const error_messages_constant_1 = require("../constants/error-messages.constant");
let I18nExceptionFilter = I18nExceptionFilter_1 = class I18nExceptionFilter {
    logger = new common_1.Logger(I18nExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const langHeader = request.headers['lang'];
        const supportedLangs = ['en', 'ru', 'tj'];
        const currentLang = langHeader && supportedLangs.includes(langHeader.toLowerCase())
            ? langHeader.toLowerCase()
            : 'en';
        const exceptionResponse = exception.getResponse();
        const rawMessage = typeof exceptionResponse === 'string'
            ? exceptionResponse
            : exceptionResponse.message || exception.message;
        let translatedMessage = rawMessage;
        const translateString = (msg) => {
            for (const [key, translations] of Object.entries(error_messages_constant_1.ErrorMessages)) {
                if (key === msg ||
                    translations.en === msg ||
                    translations.ru === msg ||
                    translations.tj === msg) {
                    return translations[currentLang];
                }
            }
            return msg;
        };
        if (Array.isArray(rawMessage)) {
            translatedMessage = rawMessage.map((m) => translateString(m));
        }
        else if (typeof rawMessage === 'string') {
            translatedMessage = translateString(rawMessage);
        }
        const jsonResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: translatedMessage,
        };
        this.logger.error(`${request.method} ${request.url} - Status: ${status} - Message: ${JSON.stringify(translatedMessage)}`);
        response.status(status).json(jsonResponse);
    }
};
exports.I18nExceptionFilter = I18nExceptionFilter;
exports.I18nExceptionFilter = I18nExceptionFilter = I18nExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], I18nExceptionFilter);
//# sourceMappingURL=i18n-exception.filter.js.map