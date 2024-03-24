import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type Visitor } from '../types/ui/visitor';

type State = {
	visitors: Visitor[];
	currentVisitor?: Visitor;
	previousVisitors: Visitor[];
};

type Action = {
	setVisitors: (visitors: Visitor[]) => void;
	updateVisitors: (visitors: Partial<Visitor>[]) => void;
	setCurrentVisitor: (visitor?: Visitor) => void;
};

type VisitorsStore = State & Action;

const visitorsStore = persist<VisitorsStore>(
	(set) => ({
		visitors: [],
		currentVisitor: undefined,
		previousVisitors: [],
		setVisitors: (visitors) => {
			if (visitors.length === 0) {
				return;
			}

			set({
				visitors,
			});
		},
		setCurrentVisitor: (visitor) => {
			set((state) => {
				if (!visitor || (state.previousVisitors[0] && state.previousVisitors[0].id === visitor.id)) {
					return {
						currentVisitor: visitor,
						previousVisitors: state.previousVisitors,
					};
				}

				const existingIndex = state.previousVisitors.findIndex((v) => v.id === visitor.id);

				let newPreviousVisitors = [];

				if (existingIndex > 0) {
					newPreviousVisitors = [visitor, ...state.previousVisitors.slice(0, existingIndex), ...state.previousVisitors.slice(existingIndex + 1)];
				} else {
					newPreviousVisitors = [visitor, ...state.previousVisitors];
				}

				newPreviousVisitors = newPreviousVisitors.slice(0, 3);

				return {
					currentVisitor: visitor,
					previousVisitors: newPreviousVisitors,
				};
			});
		},
		updateVisitors: (updatedVisitors) => {
			set((state) => {
				const visitors = state.visitors.map((visitor) => {
					const updatedVisitor = updatedVisitors.find((v) => v.id === visitor.id);

					if (updatedVisitor) {
						return {
							...visitor,
							...updatedVisitor,
						};
					}

					return visitor;
				});

				return {
					visitors,
					currentVisitor: visitors.find((v) => v.id === state.currentVisitor?.id),
				};
			});
		},
	}),
	{
		name: 'visitorsStore',
		storage: createJSONStorage(() => sessionStorage),
	},
);

export const useVisitorsStore = create<VisitorsStore>()(visitorsStore);
