import OnboardingLayoutBase from '@/layouts/OnboardingLayout';

type Props = {
	readonly children: React.ReactNode;
};

const OnboardingLayout = (props: Props) => {
	return <OnboardingLayoutBase>{props.children}</OnboardingLayoutBase>;
};

export default OnboardingLayout;
