import { cn } from '@/lib/utils/component';

type Props = {
	readonly children: React.ReactNode;
	readonly className?: string;
};

const PageWrapper = (props: Props) => {
	return <section className={cn(props.className, 'flex flex-cols h-full w-full')}>{props.children}</section>;
};

export default PageWrapper;
