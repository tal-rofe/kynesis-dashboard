import React from 'react';

import KpiCard from './KpiCard';

const KpiCardsView = () => {
	return (
		<div className="flex items-center w-full gap-6">
			<KpiCard label="New profiles" icon="userPlus" title="+10,346" description="+20.1% from last month" />
			<KpiCard label="Returning profiles" icon="userCheck" title="+10,346" description="+20.1% from last month" />
			<KpiCard label="Page views" icon="laptop" title="+10,346" description="+20.1% from last month" />
			<KpiCard label="Sessions" icon="waves" title="+10,346" description="+20.1% from last month" />
		</div>
	);
};

export default React.memo(KpiCardsView);
