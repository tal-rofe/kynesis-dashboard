type Props = {
	readonly children: React.ReactNode;
};

const PageWrapper = (props: Props) => {
	return <section className="h-full w-full">{props.children}</section>;
};

export default PageWrapper;
