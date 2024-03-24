type Props = {
	readonly children: React.ReactNode;
};

const UIModal = (props: Props) => {
	return (
		<div className="bg-white dark:bg-black px-1 pb-1.5 max-w-[472px] w-full rounded-md overflow-hidden shadow" onClick={(event) => event.stopPropagation()}>
			{props.children}
		</div>
	);
};

UIModal.displayName = 'UIModal';

export { UIModal };
