/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { CSVLink } from 'react-csv';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import { type Visitor } from '@/lib/types/ui/visitor';
import { addEllipsis } from '@/lib/utils/text';
import { routes } from '@/lib/routes';

import { UITable, UITableHeader, UITableRow, UITableHead, UITableBody, UITableCell } from './UITable';
import { UIButton } from './UIButton';
import {
	UIDropdownMenu,
	UIDropdownMenuTrigger,
	UIDropdownMenuContent,
	UIDropdownMenuLabel,
	UIDropdownMenuItem,
	UIDropdownMenuSeparator,
} from './UIDropdownMenu';
import UISvg from './UISvg';
import { UIInput } from './UIInput';
import { UITooltip, UITooltipContent, UITooltipProvider } from './UITooltip';
import { UICardDescription, UICardTitle } from './UICard';

type Props = {
	readonly data: Visitor[];
	readonly className?: string;
	readonly liveUpdates?: boolean;
	readonly dataOnly?: boolean;
	readonly onRowAction?: (visitor: Visitor) => void;
};

const UIVisitorsTable = (props: Props) => {
	const pathname = usePathname();
	const currentDate = new Date();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [currentVisitorState, setCurrentVisitorState] = useState<Visitor | undefined>(undefined);

	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	const onSetCurrentVisitor = (visitor: Visitor) => {
		setCurrentVisitor(visitor);
	};

	const csvHeaders = [
		{ label: 'Full name', key: 'fullName' },
		{ label: 'Email', key: 'email' },
		{ label: 'Phone Number', key: 'phoneNumber' },
		{ label: 'Status', key: 'status' },
		{ label: 'Priority', key: 'priority' },
		{ label: 'Country', key: 'country' },
		{ label: 'City', key: 'city' },
		{ label: 'Gender', key: 'gender' },
	];

	const columns: ColumnDef<Visitor>[] = [
		{
			accessorKey: 'fullName',
			header: 'Full name',
			size: 100,
			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('fullName')}</div>,
		},
		{
			accessorKey: 'email',
			size: 100,
			header: ({ column }) => {
				return (
					<UIButton className="min-w-16" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Email
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</UIButton>
				);
			},
			cell: ({ row }) => <div className="lowercase min-w-16">{addEllipsis(row.getValue('email'), 20)}</div>,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			size: 133.33,
			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('status')}</div>,
		},

		{
			accessorKey: 'priority',
			header: 'Priority',
			size: 133.33,
			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('priority')}</div>,
		},
		{
			accessorKey: 'country',
			header: 'Country',
			size: 133.33,
			enablePinning: true,

			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('country')}</div>,
		},
		{
			accessorKey: 'city',
			header: 'City',
			size: 133.33,
			enablePinning: true,
			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('city')}</div>,
		},
		{
			accessorKey: 'gender',
			header: 'Gender',
			size: 133.33,
			enablePinning: true,
			cell: ({ row }) => <div className="capitalize min-w-16">{row.getValue('gender')}</div>,
		},
	];

	!props.dataOnly &&
		columns.push({
			size: 30,
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const visitor = row.original;

				return (
					<UIDropdownMenu>
						<UIDropdownMenuTrigger asChild>
							<UIButton variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</UIButton>
						</UIDropdownMenuTrigger>
						<UIDropdownMenuContent align="end">
							<UIDropdownMenuLabel>Actions</UIDropdownMenuLabel>
							<UIDropdownMenuItem onClick={() => onSetCurrentVisitor(visitor)}>
								<Link className="w-full" href={`${pathname}/${visitor.id}`} passHref>
									Message
								</Link>
							</UIDropdownMenuItem>
							<UIDropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.email)}>Copy visitor email</UIDropdownMenuItem>
							<UIDropdownMenuSeparator />
							<UIDropdownMenuItem>View visitor details</UIDropdownMenuItem>
						</UIDropdownMenuContent>
					</UIDropdownMenu>
				);
			},
		});

	const table = useReactTable({
		data: props.data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		enableRowPinning: true,
		keepPinnedRows: true,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	useEffect(() => {
		const selectedRowIndex = Object.keys(rowSelection)[0] ?? '-1';
		const selectedRow = props.data.find((_, index) => index.toString() === selectedRowIndex);

		setCurrentVisitorState(selectedRow);
	}, [rowSelection]);

	return (
		<div className="w-full h-full overflow-hidden">
			{props.dataOnly ? (
				<div className="flex items-center justify-between mb-6">
					<div className="gap-1.5">
						<UICardTitle className=" text-xl">Recent visitors</UICardTitle>
						<UICardDescription className=" text-sm">View and manage your visitors</UICardDescription>
					</div>
					<UIButton asChild className="bg-[#15803D]">
						<Link href={routes.visitors.path} className="text-white">
							<UISvg name="arrowUpRight" className="mr-2" />
							View all
						</Link>
					</UIButton>
				</div>
			) : (
				<div className="flex items-center py-4 gap-2">
					<UITooltipProvider>
						<UITooltip>
							{!currentVisitorState && (
								<UITooltipContent>
									<span>You have to choose a visitor</span>
								</UITooltipContent>
							)}
						</UITooltip>
					</UITooltipProvider>
					<UIButton className="rounded-3xl" variant="secondary" asChild>
						<CSVLink
							data={props.data}
							headers={csvHeaders}
							filename={`visitors-${currentDate.getDate()}-${
								currentDate.getMonth() + 1
							}-${currentDate.getFullYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`}
						>
							Export to CSV
						</CSVLink>
					</UIButton>

					<UIInput
						placeholder="Filter emails..."
						value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
						className="max-w-sm"
						onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
					/>
					<UIDropdownMenu>
						<UIDropdownMenuTrigger asChild>
							<UIButton variant="outline" className="ml-auto">
								Columns
								<ChevronDown className="ml-2 h-4 w-4" />
							</UIButton>
						</UIDropdownMenuTrigger>
						<UIDropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</UIDropdownMenuContent>
					</UIDropdownMenu>
				</div>
			)}
			<div className=" overflow-scroll h-full pb-6">
				<UITable className="mb-6">
					<UITableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<UITableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<UITableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</UITableHead>
									);
								})}
							</UITableRow>
						))}
					</UITableHeader>
					<UITableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<UITableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<UITableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</UITableCell>
									))}
								</UITableRow>
							))
						) : (
							<UITableRow>
								<UITableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</UITableCell>
							</UITableRow>
						)}
					</UITableBody>
				</UITable>
			</div>

			{!props.dataOnly && (
				<div className="flex items-center justify-between  py-4">
					{props.liveUpdates ? (
						<div className="flex items-center space-x-2">
							<span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
							<span className=" text-muted-foreground text-sm">Updating live from your website</span>
						</div>
					) : (
						<UIButton variant="ghost" size="sm" onClick={() => table.previousPage()}>
							<UISvg name="plus" className="mr-1 stroke-[#0F172A] dark:stroke-white" />
							Add prospect
						</UIButton>
					)}

					{/* <div className="text-sm text-muted-foreground">
					{`${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
				</div> */}
					<div className="space-x-2">
						<UIButton variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
							Previous
						</UIButton>
						<UIButton variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
							Next
						</UIButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default React.memo(UIVisitorsTable);
