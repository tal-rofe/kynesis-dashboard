type Props = {
	readonly children: React.ReactNode;
};

const PageWrapper = (props: Props) => {
	return <div>{props.children}</div>;
};

export default PageWrapper;
