import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type EmailSubjects } from '../types/ui/email-subjects';
import { type Visitor } from '../types/ui/visitor';

type State = {
	readonly visitors: Visitor[];
	readonly currentVisitor?: Visitor;
	readonly previousVisitors: Visitor[];
	readonly emailSubjects: Record<EmailSubjects, string>[];
};

type Action = {
	readonly setVisitors: (visitors: Visitor[]) => void;
	readonly updateVisitors: (visitors: Partial<Visitor>[]) => void;
	readonly setCurrentVisitor: (visitor?: Visitor) => void;
	readonly setEmailSubjects: (key: EmailSubjects, value: string) => void;
	readonly resetEmailSubjects: VoidFunction;
};

type VisitorsStore = State & Action;

const visitorsStore = persist<VisitorsStore>(
	(set) => ({
		visitors: [],
		currentVisitor: undefined,
		previousVisitors: [],
		emailSubjects: [],

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

				if (existingIndex >= 0) {
					newPreviousVisitors = [
						visitor,
						...state.previousVisitors.slice(0, existingIndex),
						...state.previousVisitors.slice(existingIndex + 1),
					];
				} else {
					newPreviousVisitors = [visitor, ...state.previousVisitors];
				}

				newPreviousVisitors = newPreviousVisitors.slice(0, 3);

				set({ emailSubjects: [] });

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
		setEmailSubjects: (key: EmailSubjects, value: string) => {
			if (!key || !value) {
				return;
			}

			set((state) => {
				// Initialize emailSubjects to ensure we are working with an array
				const emailSubjectsArray = state.emailSubjects ?? [];

				// Find if an entry with the same key and value already exists
				const existingIndex = emailSubjectsArray.findIndex((subject) => subject[key] === value);

				let updatedEmailSubjects: Record<EmailSubjects, string>[];

				if (existingIndex >= 0) {
					// If found, remove the existing entry by creating a new array excluding it
					updatedEmailSubjects = [...emailSubjectsArray.slice(0, existingIndex), ...emailSubjectsArray.slice(existingIndex + 1)];
				} else {
					// If not found, add the new key-value pair
					// Directly asserting the new object to the expected Record type
					const newEmailSubject: Record<EmailSubjects, string> = { [key]: value } as Record<EmailSubjects, string>;

					updatedEmailSubjects = [...emailSubjectsArray, newEmailSubject];
				}

				// Return the updated state
				return {
					...state,
					emailSubjects: updatedEmailSubjects,
				};
			});
		},
		resetEmailSubjects: () => {
			set({
				emailSubjects: [],
			});
		},
	}),
	{
		name: 'visitorsStore',
		storage: createJSONStorage(() => sessionStorage),
	},
);

export const useVisitorsStore = create<VisitorsStore>()(visitorsStore);
