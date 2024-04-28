import CoresignalApi from '../apis/linkedin-url/coresignal';
import type LinkedinUrl from '../apis/linkedin-url/linkedin-url.abstract';
import ProxycurlPersonLookupApi from '../apis/linkedin-url/proxycurl.person-lookup';
import ProxycurlReverseEmailLookupApi from '../apis/linkedin-url/proxycurl.reverse-email-lookup';
import RampedupApi from '../apis/linkedin-url/rampedup';

export const linkedinUrlApis: LinkedinUrl[] = [
	new ProxycurlReverseEmailLookupApi(),
	new ProxycurlPersonLookupApi(),
	new RampedupApi(),
	new CoresignalApi(),
];

export const looseFirstNameLinkedinUrlApis: LinkedinUrl[] = [linkedinUrlApis[0]!, linkedinUrlApis[2]!, linkedinUrlApis[3]!];
