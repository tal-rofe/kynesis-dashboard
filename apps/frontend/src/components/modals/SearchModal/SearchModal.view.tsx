import React from 'react';
import Link from 'next/link';
import { UIInput } from '@/ui/UIInput';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import UISvg from '@/ui/UISvg';
import { UIMenubarShortcut } from '@/ui/UIMenu';
import { UIButton } from '@/ui/UIButton';

type Props = {
	readonly pages: SidebarElement[];
};

const SearchModalView = (props: Props) => {
	return (
		<div className="bg-white px-1 pb-1.5 max-w-[472px] w-full rounded-md overflow-hidden shadow">
			<div className="flex items-center justify-start border-b pl-1">
				<UISvg name="search" />
				<UIInput
					className="w-full border-none rounded-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent focus-visible:ring-transparent focus-visible:ring-offset pl-2"
					type="text"
					placeholder="Type a command or search..."
				/>
			</div>
			<div className="gap-1.5">
				<div>
					<span className="py-1.5 px-2 text-muted-foreground text-xs">Recent contacts</span>
				</div>
				<div>
					<span className="py-1.5 px-2 text-muted-foreground text-xs">Pages</span>
					{props.pages.map((page) => {
						if (!page.link) return;

						return (
							<UIButton key={page.link} asChild type="button" variant="ghost" className="w-full justify-start px-1 pb-1.5">
								<Link href={page.link} className="flex items-center gap-2 w-full">
									<UISvg name={page.icon} />
									<div className="w-full flex items-center justify-between">
										<span>{page.label}</span>
										<UIMenubarShortcut>{`⌘${page.label[0]}`}</UIMenubarShortcut>
									</div>
								</Link>
							</UIButton>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default React.memo(SearchModalView);
