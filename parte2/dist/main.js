"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const logger_service_1 = require("./common/logger/logger.service");
const dotenv = require("dotenv");
require("./instrument");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_service_1.AppLogger()
    });
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos'
    }));
    app.use(mongoSanitize());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Usuários')
        .setDescription('API RESTful para gerenciamento de usuários')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map