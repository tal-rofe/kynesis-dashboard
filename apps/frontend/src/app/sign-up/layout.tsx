import AuthLayoutBase from '@/layouts/AuthLayout';

type Props = {
	readonly children: React.ReactNode;
};

const SignupLayout = (props: Props) => {
	return <AuthLayoutBase>{props.children}</AuthLayoutBase>;
};

export default SignupLayout;
