import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import type { Environment } from './config/env.interface';

const app = await NestFactory.create(AppModule, {
	logger: process.env.NODE_ENV === 'production' ? false : undefined,
});

// Apply validation pipe for controllers' request data
app.useGlobalPipes(
	new ValidationPipe({
		whitelist: true,
	}),
);

app.use(helmet());

const config = app.get<ConfigService<Environment, true>>(ConfigService);
const nodeEnv = config.get('nodeEnv', { infer: true });
const proxyServerUrl = config.get('proxyServerUrl', { infer: true });

app.enableCors({ origin: proxyServerUrl });

if (nodeEnv === 'development') {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Kynesis Backend Dashboard')
		.setDescription('The Kynesis Backend Dashboard API Description')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('api', app, document);
}

const port = config.get('port', { infer: true });

await app.listen(port);
