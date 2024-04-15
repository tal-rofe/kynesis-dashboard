---
to: src/app/<%= h.changeCase.paramCase(name.toLowerCase()) %>/layout.tsx
---
import BaseLayout from '@/layouts/BaseLayout';

type Props = {
	readonly children: React.ReactNode;
};

const <%= h.changeCase.pascalCase(name.toLowerCase()) %>Layout = (props: Props) => {
	return (
     	<BaseLayout header sidebar navBack>
			{props.children}
		</BaseLayout>
	);
};

export default <%= h.changeCase.pascalCase(name.toLowerCase()) %>Layout;
