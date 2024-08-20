import morgan from "morgan";
import * as express from "express";
import { NestFactory } from "@nestjs/core";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { logger } from "../infrastructure/lib/logger";
import { AllExceptionsFilter } from "../infrastructure/lib/filter/all.exception.filter";
import { AppModule } from "./app.module";
import { config } from "src/config";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default class Application {
	public static async main(): Promise<void> {
		let app = await NestFactory.create(AppModule);
		app.useGlobalFilters(new AllExceptionsFilter());
		app.enableCors({
			origin: "*",
		});
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			}),
		);

		
		app.setGlobalPrefix("api");
		app.use("/api/upload", express.static(join(__dirname, "../../../uploads")));
		app.use(
			morgan(function (tokens, req, res): any {
				logger.info({
					correlationId: req.headers["x-correlation-id"],
					method: tokens.method(req, res),
					url: tokens.url(req, res),
					status: tokens.status(req, res),
					contentLength: tokens.res(req, res, "content-length"),
					responseTime: tokens["response-time"](req, res),
					remoteAddr: tokens["remote-addr"](req, res),
					userAgent: tokens["user-agent"](req, res),
					httpVersion: tokens["http-version"](req, res),
					totalTime: tokens["total-time"](req, res),
				});
			}),
		);
        const swagger = new DocumentBuilder()
        .setTitle('Todo simple App')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addTag('Nestjs, postgreSQL, typeORM')
        .build();
      const document = SwaggerModule.createDocument(app, swagger);
      SwaggerModule.setup('/api/docs', app, document);
		await app.listen(config.PORT, () => {
			logger.info(`Server running on  ${config.PORT} port`);
		});
	}
}
