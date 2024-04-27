import React, { useState } from 'react';
import { type IHeaderParams } from 'ag-grid-community';

import UISvg from './UISvg';

const CustomHeader: React.FC<IHeaderParams> = (params) => {
	const [pinned, setPinned] = useState<boolean>(params.column.isPinned());

	const togglePinning = () => {
		if (pinned) {
			params.api.setColumnsPinned([params.column.getColId()], null);

			params.column.setPinned(null);
		} else {
			params.api.setColumnsPinned([params.column.getColId()], 'left');

			params.column.setPinned('left');
		}

		setPinned((prev) => !prev);
	};

	return (
		<div className="flex items-center gap-2 group">
			<span>{params.displayName}</span>
			<button
				type="button"
				className={`opacity-0 group-hover:opacity-100 transition-opacity ${pinned ? 'opacity-100' : ''}`}
				onClick={togglePinning}
			>
				<UISvg name={pinned ? 'drawingPinFilled' : 'drawingPin'} />
			</button>
		</div>
	);
};

export default CustomHeader;
