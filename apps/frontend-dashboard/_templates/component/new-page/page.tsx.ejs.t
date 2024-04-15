---
to: src/app/<%= h.changeCase.paramCase(name.toLowerCase()) %>/page.tsx
---
import React from 'react';

const <%= h.changeCase.pascalCase(name.toLowerCase()) %> = () => {
	return (
		<section>
			<div>this is a <%= h.changeCase.pascalCase(name.toLowerCase()) %> page</div>
		</section>
	);
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>);
