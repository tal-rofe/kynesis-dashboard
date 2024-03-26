import AuthLayoutBase from '@/layouts/AuthLayout';

type Props = {
	readonly children: React.ReactNode;
};

const LoginLayout = (props: Props) => {
	return <AuthLayoutBase>{props.children}</AuthLayoutBase>;
};

export default LoginLayout;
