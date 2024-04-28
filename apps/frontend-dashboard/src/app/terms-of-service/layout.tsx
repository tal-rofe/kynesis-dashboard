import BaseLayout from '@/layouts/BaseLayout';

type Props = {
	readonly children: React.ReactNode;
};

const TermsOfServiceLayout = (props: Props) => {
	return (
		<BaseLayout>
			{props.children}
		</BaseLayout>
	);
};

export default TermsOfServiceLayout;
