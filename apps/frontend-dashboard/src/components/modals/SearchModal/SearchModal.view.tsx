/* eslint-disable max-lines */
import React from 'react';
import Link from 'next/link';

import { UIInput } from '@/ui/UIInput';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import UISvg from '@/ui/UISvg';
import { UIMenubarShortcut } from '@/ui/UIMenu';
import { UIButton } from '@/ui/UIButton';
import { UIModal } from '@/ui/UIModal';
import { type Visitor } from '@/lib/types/ui/visitor';
import { routes } from '@/lib/routes';
import { UIAvatar, UIAvatarFallback, UIAvatarImage } from '@/ui/UIAvatar';

type Props = {
	readonly visitors: Visitor[];
	readonly pages: SidebarElement[];
	readonly searchInputValue: string;
	readonly previousVisitors: Visitor[];
	readonly hideModal: VoidFunction;
	readonly setCurrentVisitor: (visitor: Visitor) => void;
	readonly onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchModalView = (props: Props) => {
	return (
		<UIModal>
			<div className="flex items-center justify-start border-b pl-1">
				<UISvg name="search" className="iconStroke" />
				<UIInput
					className="w-full border-none rounded-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent focus-visible:ring-transparent focus-visible:ring-offset pl-2"
					type="text"
					placeholder="Type a command or search..."
					value={props.searchInputValue}
					onChange={props.onSearchInputChange}
				/>
			</div>
			{props.searchInputValue.length ? (
				!props.visitors.filter((visitor) => visitor.fullName.toLowerCase().includes(props.searchInputValue)).length &&
				!props.pages.filter((visitor) => visitor.label.toLowerCase().includes(props.searchInputValue)).length ? (
					<span className="py-1.5 px-2 text-muted-foreground text-xs">No results :(</span>
				) : (
					<>
						{props.visitors
							.filter((visitor) => visitor.fullName.toLowerCase().includes(props.searchInputValue))
							.map((visitor) => {
								if (!visitor.id) {
									return;
								}

								return (
									<UIButton
										key={visitor.id}
										asChild
										type="button"
										variant="ghost"
										className="w-full justify-start px-1 pb-1.5"
										tabIndex={0}
										onClick={() => {
											props.hideModal();
											props.setCurrentVisitor(visitor);
										}}
									>
										<Link href={`${routes.visitors.path}/${visitor.id}`} className="flex items-center gap-2 w-full">
											<UIAvatar className="w-7 h-7 border">
												<UIAvatarImage src="https://github.com/shadcn.png" />
												<UIAvatarFallback>CN</UIAvatarFallback>
											</UIAvatar>
											<span>{visitor.fullName}</span>
										</Link>
									</UIButton>
								);
							})}

						{props.pages
							.filter((visitor) => visitor.label.toLowerCase().includes(props.searchInputValue))
							.map((page) => {
								if (!page.link) {
									return;
								}

								return (
									<UIButton
										key={page.link}
										asChild
										type="button"
										variant="ghost"
										className="w-full justify-start px-1 pb-1.5"
										onClick={props.hideModal}
									>
										<Link href={page.link} className="flex items-center gap-2 w-full">
											<UISvg name={page.icon} className="iconStroke" />
											<div className="w-full flex items-center justify-between">
												<span>{page.label}</span>
												<UIMenubarShortcut>{`⌘${page.label[0]}`}</UIMenubarShortcut>
											</div>
										</Link>
									</UIButton>
								);
							})}
					</>
				)
			) : (
				<div className="gap-1.5">
					{!!props.previousVisitors.length && (
						<>
							<span className="py-1.5 px-2 text-muted-foreground text-xs">Recent contacts</span>
							{props.previousVisitors.map((visitor) => {
								if (!visitor.id) {
									return;
								}

								return (
									<UIButton
										key={visitor.id}
										asChild
										type="button"
										variant="ghost"
										className="w-full justify-start px-1 pb-1.5"
										onClick={() => {
											props.hideModal();
											props.setCurrentVisitor(visitor);
										}}
									>
										<Link href={`${routes.visitors.path}/${visitor.id}`} className="flex items-center gap-2 w-full">
											<UIAvatar className="w-7 h-7 border">
												<UIAvatarImage src="https://github.com/shadcn.png" />
												<UIAvatarFallback>CN</UIAvatarFallback>
											</UIAvatar>
											<span>{visitor.fullName}</span>
										</Link>
									</UIButton>
								);
							})}
						</>
					)}
					<span className="py-1.5 px-2 text-muted-foreground text-xs">Pages</span>
					{props.pages.map((page) => {
						if (!page.link) {
							return;
						}

						return (
							<UIButton
								key={page.link}
								asChild
								type="button"
								variant="ghost"
								className="w-full justify-start px-1 pb-1.5"
								onClick={props.hideModal}
							>
								<Link href={page.link} className="flex items-center gap-2 w-full">
									<UISvg name={page.icon} className="iconStroke" />
									<div className="w-full flex items-center justify-between">
										<span>{page.label}</span>
										<UIMenubarShortcut>{`⌘${page.label[0]}`}</UIMenubarShortcut>
									</div>
								</Link>
							</UIButton>
						);
					})}
				</div>
			)}
		</UIModal>
	);
};

export default React.memo(SearchModalView);
