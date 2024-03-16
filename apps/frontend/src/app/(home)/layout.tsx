import BaseLayout from '@/layouts/BaseLayout';

type Props = {
	readonly children: React.ReactNode;
};

const HomeLayout = (props: Props) => {
	return <BaseLayout>{props.children}</BaseLayout>;
};

export default HomeLayout;
