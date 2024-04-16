/**
 * Formats a Date object into a custom string format "DD.MM.YY h:mm A GMT".
 * This function assumes the input date is in UTC and formats it accordingly.
 *
 * @param date - The Date object to be formatted.
 * @returns The formatted date string in the format "DD.MM.YY h:mm A GMT".
 */
export const formatDate = (date: Date): string => {
	const opts: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone: 'GMT',
		timeZoneName: 'short',
	};

	const dateFormatter = new Intl.DateTimeFormat('en-GB', opts);
	const formattedDate = dateFormatter.format(date);

	const [datePart, timePart] = formattedDate.split(', ');

	if (datePart === undefined || timePart === undefined) {
		throw new Error('Invalid date format');
	}

	const [day, month, year] = datePart.split('/');

	const finalFormat = `${day}.${month}.${year} ${timePart}`;

	return finalFormat;
};
