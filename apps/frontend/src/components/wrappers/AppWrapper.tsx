import NextTopLoader from 'nextjs-toploader';

type Props = {
	readonly children: React.ReactNode;
};

const AppWrapper = (props: Props) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<NextTopLoader
					color="#2299DD"
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					crawl
					showSpinner
					easing="ease"
					speed={200}
					shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
				/>
				{props.children}
			</body>
		</html>
	);
};

export default AppWrapper;
