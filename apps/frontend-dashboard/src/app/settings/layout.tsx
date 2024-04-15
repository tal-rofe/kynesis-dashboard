import BaseLayout from '@/layouts/BaseLayout';

type Props = {
	readonly children: React.ReactNode;
};

const SettingsLayout = (props: Props) => {
	return (
		<BaseLayout header sidebar>
			{props.children}
		</BaseLayout>
	);
};

export default SettingsLayout;
