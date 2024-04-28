type ScriptDomainType = 'everySubDomain' | 'specificSubDomain';

export const generatePixelTrackingScript = (companyUrl: string, scriptDomainType: ScriptDomainType): string => {
	const parsedUrl = new URL(companyUrl);
	let domain: string;

	switch (scriptDomainType) {
		case 'everySubDomain':
			domain = `*.${parsedUrl.hostname.replace(/^(www\.)?/, '')}`;

			break;
		case 'specificSubDomain':
			domain = parsedUrl.hostname;

			break;
		default:
			throw new Error('Invalid script domain type provided.');
	}

	return `<script>
(function() {
  var pixel = document.createElement('img');
  pixel.src = 'https://${domain}/pixel.gif';
  pixel.style.display = 'none';
  document.body.appendChild(pixel);
})();
</script>`;
};
