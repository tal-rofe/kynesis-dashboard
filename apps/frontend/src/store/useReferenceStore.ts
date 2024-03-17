import { create } from 'zustand';

import { persist } from 'zustand/middleware';

type State = {
	name: string;
};

type Actions = {
	setUserName: (userName: string) => void;
};

type UserStore = Actions & State;

const userStore = persist<UserStore>(
	(set) => ({
		name: '',

		setUserName: (userName: string) => {
			set({
				name: userName,
			});
		},
	}),
	{
		name: 'userStore',
	},
);

export const useFormsCopyStore = create<UserStore>()(userStore);
