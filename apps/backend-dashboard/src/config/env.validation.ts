import { plainToClass } from 'class-transformer';
import { IsPositive, IsInt, validate, IsIn, IsString } from 'class-validator';

import type { Environment } from './env.interface';

class EnvironmentVariables {
	@IsIn(['development', 'production'])
	public NODE_ENV!: Environment['nodeEnv'];

	@IsInt()
	@IsPositive()
	public PORT!: number;

	@IsString()
	public PROXY_SERVER_URL!: string;
}

export const validateEnv = async (config: Record<string, unknown>) => {
	const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
	const errors = await validate(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
};
