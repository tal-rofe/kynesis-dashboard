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
import { cn } from '@/lib/utils/component';
import { routes } from '@/lib/routes';
import { addEllipsis } from '@/lib/utils/text';

import { UITable, UITableHeader, UITableRow, UITableHead, UITableBody, UITableCell } from './UITable';
import { UIButton } from './UIButton';
import { UICheckbox } from './UICheckbox';
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
import { UITooltip, UITooltipContent, UITooltipProvider, UITooltipTrigger } from './UITooltip';

const columns: ColumnDef<Visitor>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<UICheckbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				aria-label="Select all"
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		cell: ({ row }) => <UICheckbox checked={row.getIsSelected()} aria-label="Select row" onCheckedChange={(value) => row.toggleSelected(!!value)} />,
		enableSorting: false,
		size: 30,
		enableHiding: false,
	},
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
	{
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
						<UIDropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.email)}>Copy visitor email</UIDropdownMenuItem>
						<UIDropdownMenuSeparator />
						<UIDropdownMenuItem>View visitor details</UIDropdownMenuItem>
					</UIDropdownMenuContent>
				</UIDropdownMenu>
			);
		},
	},
];

type Props = {
	readonly data: Visitor[];
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
	const isLiveUpdates = pathname === routes.visitors.path;

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

	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	useEffect(() => {
		const selectedRowIndex = Object.keys(rowSelection)[0] ?? '-1';
		const selectedRow = props.data.find((_, index) => index.toString() === selectedRowIndex);

		setCurrentVisitorState(selectedRow);
	}, [rowSelection]);

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

	const onSetCurrentVisitor = () => {
		if (currentVisitorState) {
			setCurrentVisitor(currentVisitorState);
		}
	};

	return (
		<div className="w-full">
			<div className="flex items-center py-4 gap-2">
				<UITooltipProvider>
					<UITooltip>
						<UITooltipTrigger className={cn(!currentVisitorState && 'cursor-not-allowed')}>
							<UIButton className="rounded-3xl" variant="outline" asChild onClick={onSetCurrentVisitor}>
								<Link
									href={`${pathname}/${currentVisitorState?.id}`}
									className={cn(!currentVisitorState && 'pointer-events-none')}
									aria-disabled={!currentVisitorState}
									tabIndex={!currentVisitorState ? -1 : undefined}
									passHref
								>
									Message
								</Link>
							</UIButton>
						</UITooltipTrigger>
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
			<div className="rounded-md border max-h-[65vh] overflow-y-auto">
				<UITable>
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
			<div className="flex items-center justify-between  py-4">
				{isLiveUpdates ? (
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
		</div>
	);
};

export default React.memo(UIVisitorsTable);
