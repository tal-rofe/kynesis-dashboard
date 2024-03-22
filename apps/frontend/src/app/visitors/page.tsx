/* eslint-disable max-lines */
'use client';
import React, { useState } from 'react';
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
import { DropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { UIButton } from '@/ui/UIButton';
import { UIInput } from '@/ui/UIInput';
import { UITable, UITableHeader, UITableRow, UITableHead, UITableBody, UITableCell } from '@/ui/UITable';
import { UICheckbox } from '@/ui/UICheckbox';
import {
	UIDropdownMenu,
	UIDropdownMenuTrigger,
	UIDropdownMenuContent,
	UIDropdownMenuLabel,
	UIDropdownMenuItem,
	UIDropdownMenuSeparator,
} from '@/ui/UIDropdownMenu';

const data: Visitor[] = [
	{
		id: 'm5gr84i9',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
	},
	{
		id: '123123',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
	},
	{
		id: '12312ds3',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
	},
	{
		id: '12312sd3',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
	},
	{
		id: '123asd123',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
	},
];

type Visitor = {
	readonly id: string;
	readonly fullName: string;
	readonly email: string;
	readonly status: 'pending' | 'processing' | 'success' | 'failed';
	readonly priority: 'low' | 'medium' | 'high';
};

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
		size: 1,
		enableHiding: false,
	},
	{
		accessorKey: 'fullName',
		header: 'Full name',
		cell: ({ row }) => <div className="capitalize">{row.getValue('fullName')}</div>,
	},
	{
		accessorKey: 'email',
		size: 2,
		header: ({ column }) => {
			return (
				<UIButton variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</UIButton>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
	},
	{
		size: 1,
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
	},

	{
		size: 1,
		accessorKey: 'priority',
		header: 'Priority',
		cell: ({ row }) => <div className="capitalize">{row.getValue('priority')}</div>,
	},
	{
		size: 1,
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

const Visitors = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
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
			<div className="rounded-md border">
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
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{`${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
				</div>
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

export default React.memo(Visitors);
