import type { ColumnPinnedType } from 'ag-grid-community';

export type TableIds = 'dashboard' | 'visitors';

export type TableCustomizeParameters = {
	[tableId in TableIds]: {
		readonly columnsProperties: { readonly colId: string; readonly width: number; readonly pinned: ColumnPinnedType }[];
		readonly columnsOrder?: string[];
	};
};
