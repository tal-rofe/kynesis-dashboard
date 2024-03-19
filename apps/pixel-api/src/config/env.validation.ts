import { plainToClass } from 'class-transformer';
import { IsPositive, IsInt, validateSync, IsIn, IsString } from 'class-validator';

import type { Environment } from './env.interface';

class EnvironmentVariables {
	@IsIn(['development', 'production'])
	public NODE_ENV!: Environment['nodeEnv'];

	@IsInt()
	@IsPositive()
	public PORT!: number;

	@IsString()
	public FRONTEND_URL!: string;
}

export const validate = (config: Record<string, unknown>) => {
	const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
};
