/**
 * Extracts the LinkedIn identifier from a given URL.
 *
 * This function parses the URL provided as an argument to extract the LinkedIn user or company identifier.
 * The identifier is typically the third segment in the pathname of the LinkedIn URL. For example,
 * in the URL "https://www.linkedin.com/in/username", "username" is the identifier that will be returned.
 *
 * @param {string} url - The LinkedIn URL from which to extract the identifier.
 * @returns {string | undefined} The extracted identifier, or undefined if the URL does not contain one.
 */
export const extractLinkedinIdentifier = (url: string): string | undefined => {
  return new URL(url)?.pathname?.split("/")?.[2];
};
