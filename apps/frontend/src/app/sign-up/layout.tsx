import AuthLayout from '@/layouts/AuthLayout';

type Props = {
	readonly children: React.ReactNode;
};

const SignupLayout = (props: Props) => {
	return <AuthLayout>{props.children}</AuthLayout>;
};

export default SignupLayout;
