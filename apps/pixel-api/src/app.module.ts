import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './config/env.validation';
import EnvConfiguration from './config/configuration';
import { HealthModule } from './modules/health/health.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			isGlobal: true,
			cache: true,
			validate,
			validationOptions: {
				allowUnknown: false,
				abortEarly: true,
			},
		}),
		HealthModule,
	],
})
export class AppModule {}
