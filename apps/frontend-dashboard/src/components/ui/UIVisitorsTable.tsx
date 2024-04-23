/* eslint-disable no-console */
/* eslint-disable max-lines */

import React, { useMemo } from 'react';
// import { CSVLink } from 'react-csv';
import type { ColDef as ColData, GridReadyEvent, SortChangedEvent } from 'ag-grid-community';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import { useTableStore } from '@/lib/store/useTableStore';
import { type Visitor } from '@/lib/types/ui/visitor';
import { routes } from '@/lib/routes';
import { formatDate } from '@/lib/utils/format';

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
import { UICardDescription, UICardTitle } from './UICard';
import CustomHeader from './UICustomTableHeader';
import { UIAvatar, UIAvatarImage, UIAvatarFallback } from './UIAvatar';

type Props = {
	readonly tableId: 'dashboard' | 'visitors';
	readonly data: Visitor[];
	readonly className?: string;
	readonly liveUpdates?: boolean;
	readonly dataOnly?: boolean;
	readonly onRowAction?: (visitor: Visitor) => void;
};

const UIVisitorsTable = (props: Props) => {
	const pathname = usePathname();
	// const currentDate = new Date();
	const { tablesCustomizeParameters, setColumnResized, setColumnDraggedStopped, setColumnPinned } = useTableStore();
	const { setCurrentVisitor } = useVisitorsStore();

	const onSetCurrentVisitor = (visitor: Visitor) => setCurrentVisitor(visitor);

	// const csvHeaders = [
	// 	{ label: 'Full name', key: 'fullName' },
	// 	{ label: 'Company', key: 'company' },
	// 	{ label: 'Title', key: 'title' },
	// 	{ label: 'Email', key: 'email' },
	// 	{ label: 'Last visit', key: 'lastVisit' },
	// ];

	const gridOptions = {
		defaultColDef: {
			cellClass: 'flex items-center h-full min-w-4',
		},
		components: {
			CustomHeader: CustomHeader,
		},

		ensureDomOrder: true,
		// autoSizeStrategy: {
		// 	type: 'fitCellContents',
		// 	skipHeader: true,
		// } as SizeColumnsToContentStrategy,
	};

	const columnData = useMemo(() => {
		const baseColumns: ColData<Visitor>[] = [
			{
				colId: 'fullName',
				field: 'fullName',
				headerName: 'Full name',
				filter: true,
				resizable: true,
				minWidth: 100,
				cellRenderer: (params: { value: string; data: Visitor }) => {
					return (
						<div className="flex items-center min-w-16 gap-2">
							<span className="capitalize">{params.value}</span>
							<Link href={params.data.linkedinUrl} target="_blank">
								<UISvg name="linkedinLogoWhite" />
							</Link>
						</div>
					);
				},
			},
			{
				colId: 'companyInfo.name',
				field: 'companyInfo.name',
				headerName: 'Company',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				minWidth: 130,
				cellRenderer: (params: { data: Visitor }) => {
					return (
						<div className="flex items-center gap-2 min-w-16">
							<UIAvatar className="w-7 h-7 border">
								<UIAvatarImage src={params.data.companyInfo.logoUrl} />
								<UIAvatarFallback>CN</UIAvatarFallback>
							</UIAvatar>
							<span className="capitalize">{params.data.companyInfo.name}</span>
						</div>
					);
				},
			},
			{
				colId: 'title',
				field: 'title',
				headerName: 'Title',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				minWidth: 200,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'email',
				field: 'email',
				headerName: 'Email',
				filter: true,
				resizable: true,
				minWidth: 150,
				cellRenderer: (params: { value: string }) => <span className="lowercase min-w-16">{params.value}</span>,
			},
			{
				colId: 'analytics.lastVisitDate',
				field: 'analytics.lastVisitDate',
				headerName: 'Last Visit',
				filter: true,
				resizable: true,
				minWidth: 190,
				cellRenderer: (params: { value: Date }) => <span className="uppercase min-w-16">{formatDate(params.value)}</span>,
			},
			{
				colId: 'analytics.allTimeVisitsCount',
				field: 'analytics.allTimeVisitsCount',
				headerName: 'All-time visits',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 80,
				cellRenderer: (params: { value: number }) => <span className="uppercase min-w-16">{params.value}</span>,
			},
			{
				colId: 'companyInfo.websiteUrl',
				field: 'companyInfo.websiteUrl',
				headerName: 'Website',
				filter: true,
				resizable: true,
				headerComponent: 'CustomHeader',
				hide: props.dataOnly,
				minWidth: 150,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'companyInfo.industry',
				field: 'companyInfo.industry',
				headerName: 'Industry',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 100,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'companyInfo.numberOfEmployees',
				field: 'companyInfo.numberOfEmployees',
				headerName: 'Employees',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 105,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'city',
				field: 'city',
				headerName: 'City',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 100,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'state',
				field: 'state',
				headerName: 'State',
				headerComponent: 'CustomHeader',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 100,
				cellRenderer: (params: { value: string }) => <span className="capitalize min-w-16">{params.value}</span>,
			},
			{
				colId: 'analytics.visitedPages',
				field: 'analytics.visitedPages',
				headerName: 'Last visited URL',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 150,
				cellRenderer: (params: { value: string[] }) => <div className="flex flex-col gap-1">{params.value[params.value.length - 1]}</div>,
			},
			{
				colId: 'analytics.firstVisitDate',
				field: 'analytics.firstVisitDate',
				headerName: 'First Visit',
				filter: true,
				resizable: true,
				hide: props.dataOnly,
				minWidth: 190,
				cellRenderer: (params: { value: Date }) => <span className="uppercase min-w-16">{formatDate(params.value)}</span>,
			},
			{
				filter: false,
				resizable: false,
				sortable: false,
				pinned: 'right',
				lockPinned: true,
				width: 50,
				minWidth: 50,
				hide: props.dataOnly,
				cellRenderer: (params: { data: Visitor }) => {
					const visitor = params.data;

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
								<UIDropdownMenuItem onClick={() => navigator.clipboard.writeText(visitor.email)}>
									Copy visitor email
								</UIDropdownMenuItem>
								<UIDropdownMenuSeparator />
								<UIDropdownMenuItem>View visitor details</UIDropdownMenuItem>
							</UIDropdownMenuContent>
						</UIDropdownMenu>
					);
				},
			},
		];

		return baseColumns;
	}, [tablesCustomizeParameters]);

	const onSaveGridColumnState = (state: SortChangedEvent) => {
		console.log('onSaveGridColumnState', state);
	};

	const onGridReady = (params: GridReadyEvent) => {
		const columnsOrder = tablesCustomizeParameters[props.tableId].columnsOrder;
		const columnsProperties = tablesCustomizeParameters[props.tableId].columnsProperties;

		if (columnsOrder) {
			const state = columnsOrder.map((colId, index) => ({
				colId: colId,
				orderIndex: index,
			}));

			params.api.applyColumnState({
				state: state,
				applyOrder: true,
			});
		}

		if (columnsProperties) {
			params.api.setColumnWidths(columnsProperties.map((col) => ({ key: col.colId, newWidth: col.width })));

			columnsProperties.forEach((column) => {
				params.api.setColumnsPinned([column.colId], column.pinned);
			});
		}
	};

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
					<UIButton className="rounded-3xl" variant="secondary" asChild>
						Export to CSV
						{/* <CSVLink
							data={props.data}
							headers={csvHeaders}
							filename={`visitors-${currentDate.getDate()}-${
								currentDate.getMonth() + 1
							}-${currentDate.getFullYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`}
						>
							Export to CSV
						</CSVLink> */}
					</UIButton>
				</div>
			)}
			<div className={`${props.dataOnly ? 'h-[calc(100vh-415px)]' : 'h-[calc(100vh-254px)]'}`}>
				<div className="ag-theme-alpine flex flex-col h-full">
					<AgGridReact
						rowData={props.data}
						columnDefs={columnData}
						rowDragManaged
						maintainColumnOrder
						gridOptions={gridOptions}
						onSortChanged={(grid) => onSaveGridColumnState(grid)}
						onColumnResized={(event) => setColumnResized(props.tableId, event)}
						onDragStopped={(event) => setColumnDraggedStopped(props.tableId, event)}
						onColumnPinned={(event) => setColumnPinned(props.tableId, event)}
						onGridReady={onGridReady}
					/>
				</div>
			</div>

			{!props.dataOnly && (
				<div className="flex items-center justify-between mt-auto py-4 flex-1 ">
					{props.liveUpdates ? (
						<div className="flex items-center space-x-2">
							<span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
							<span className=" text-muted-foreground text-sm">Updating live from your website</span>
						</div>
					) : (
						<UIButton variant="ghost" size="sm">
							<UISvg name="plus" className="mr-1 iconStroke" />
							Add prospect
						</UIButton>
					)}
				</div>
			)}
		</div>
	);
};

export default React.memo(UIVisitorsTable);
