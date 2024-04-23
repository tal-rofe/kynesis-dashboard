import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ColumnPinnedEvent, ColumnResizedEvent, DragStoppedEvent } from 'ag-grid-community';

import type { TableCustomizeParameters, TableIds } from '../types/ui/table';

type State = {
	readonly tablesCustomizeParameters: TableCustomizeParameters;
};

type Action = {
	readonly setColumnResized: (tableId: TableIds, event: ColumnResizedEvent) => void;
	readonly setColumnDraggedStopped: (tableId: TableIds, event: DragStoppedEvent) => void;
	readonly setColumnPinned: (tableId: TableIds, event: ColumnPinnedEvent) => void;
};

type TableStore = State & Action;

const initialCustomizeParameters: TableCustomizeParameters = {
	dashboard: { columnsProperties: [], columnsOrder: [] },
	visitors: { columnsProperties: [], columnsOrder: [] },
};

const tableStore = persist<TableStore>(
	(set, get) => ({
		tablesCustomizeParameters: initialCustomizeParameters,

		setColumnResized: (tableId, event) => {
			if (event.finished && event.column) {
				set((state) => {
					const currentColumnsProperties = get().tablesCustomizeParameters[tableId].columnsProperties || [];
					let found = false;

					const updatedColumnsProperties = currentColumnsProperties.map((size) => {
						if (size.colId === event.column!.getColId()) {
							found = true;

							return { ...size, width: event.column!.getActualWidth() };
						}

						return size;
					});

					if (!found) {
						updatedColumnsProperties.push({
							colId: event.column!.getColId(),
							width: event.column!.getActualWidth(),
							pinned: event.column!.getPinned(),
						});
					}

					return {
						tablesCustomizeParameters: {
							...state.tablesCustomizeParameters,
							[tableId]: {
								...state.tablesCustomizeParameters[tableId],
								columnsProperties: updatedColumnsProperties,
							},
						},
					};
				});
			}
		},

		setColumnDraggedStopped: (tableId, event) => {
			set((state) => {
				const columnsOrder = event.api.getAllDisplayedColumns().map((col) => col.getColId());

				return {
					tablesCustomizeParameters: {
						...state.tablesCustomizeParameters,
						[tableId]: {
							...state.tablesCustomizeParameters[tableId],
							columnsOrder: columnsOrder,
						},
					},
				};
			});
		},

		setColumnPinned: (tableId, event) => {
			if (event.column) {
				set((state) => {
					const currentColumnsProperties = get().tablesCustomizeParameters[tableId].columnsProperties;
					let found = false;

					const updatedColumnsProperties = currentColumnsProperties.map((size) => {
						if (size.colId === event.column!.getColId()) {
							found = true;

							return { ...size, pinned: event.column!.getPinned() };
						}

						return size;
					});

					if (!found) {
						updatedColumnsProperties.push({
							colId: event.column!.getColId(),
							width: event.column!.getActualWidth(),
							pinned: event.column!.getPinned(),
						});
					}

					return {
						tablesCustomizeParameters: {
							...state.tablesCustomizeParameters,
							[tableId]: {
								...state.tablesCustomizeParameters[tableId],
								columnsProperties: updatedColumnsProperties,
							},
						},
					};
				});
			}
		},
	}),
	{
		name: 'tableStore',
		getStorage: () => sessionStorage,
	},
);

export const useTableStore = create<TableStore>()(tableStore);
