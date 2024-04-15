/* eslint-disable no-useless-escape */
// Regular expression for matching the LinkedIn company page URL pattern
export const isValidLinkedInURL = (url: string): boolean => {
	const regex = /^https:\/\/www\.linkedin\.com\/company\/[\w-]+\/?$/;

	return regex.test(url);
};

export const isValidWebsiteUrl = (url: string): boolean => {
	const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

	return pattern.test(url);
};
