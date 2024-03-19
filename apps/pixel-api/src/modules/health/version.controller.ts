import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import Routes from './health.routes';

@ApiTags('Health')
@Controller(Routes.CONTROLLER)
export class VersionController {
	@ApiOperation({ description: 'Get version of dashboard' })
	@ApiOkResponse({ description: "If successfully got dashboard's version" })
	@Get(Routes.VERSION)
	@HttpCode(HttpStatus.OK)
	public version(): string {
		return `Kynesis Dashboard v${__PACKAGE_VERSION__}`;
	}
}
