import * as yup from 'yup';

import type { ScriptDomainType } from '../types/api/onboarding';

const scriptDomainTypes: ScriptDomainType[] = ['everySubDomain', 'specificSubDomain'];

export const trackingScriptSchema = yup.object().shape({
	websiteUrl: yup.string().url('Website URL must be a valid URL').required('Website URL is required'),
	scriptDomainType: yup.string().required('Script domain type is required').oneOf(scriptDomainTypes, 'Invalid script domain type'),
});
