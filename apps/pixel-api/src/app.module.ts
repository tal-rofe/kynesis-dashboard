import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './config/env.validation';
import EnvConfiguration from './config/configuration';

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
	],
})
export class AppModule {}
