import readline from "readline";
import chalk from "chalk";
import { prompts } from "../data/prompts";
import { PromptTypes } from "../types/prompts";
import { profilesList } from "../data/profiles";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user for a LinkedIn profile URL and returns it through a callback.
 * If no URL is provided, it uses a default URL from a predefined list.
 * @param {Function} callback - A callback function that receives the final URL as its parameter.
 */
export const promptLinkedInUrl = (callback: (finalUrl: string) => void) => {
  const defaultUrl = profilesList[0];
  const grayDefaultUrl = chalk.gray(defaultUrl);

  rl.question(`> Please enter LinkedIn profile URL (${grayDefaultUrl}):`, (url) => {
    let finalUrl = url.trim();
    if (finalUrl === "") {
      console.log(`💬 Using default URL: ${chalk.yellowBright(defaultUrl)}`);
      finalUrl = defaultUrl;
    }
    callback(finalUrl); // Pass the final URL back to the caller
  });
};

/**
 * Asks the user to select a prompt type from the available options and returns the selection through a callback.
 * @param {Function} callback - A callback function that receives an error or the selected prompt type.
 */
export const selectOpenaiServicePromptType = (
  callback: (err: Error | null, selectedPromptType?: PromptTypes) => void
): void => {
  const promptOptions = Object.keys(prompts)
    .map((key, index) => `${index + 1}. ${key}`)
    .join("\n");
  const question = `\nPlease select an option for the type of message you want to send:\n\n${promptOptions}\n\nSelect a number: `;

  rl.question(question, (answer: string) => {
    const selectedIndex = parseInt(answer, 10) - 1;
    const selectedKey = Object.keys(prompts)[selectedIndex] as PromptTypes;
    if (prompts[selectedKey]) {
      callback(null, selectedKey);
    } else {
      callback(new Error("Invalid selection. Please restart the process and select a valid number."));
    }
  });
};

/**
 * Prompts the user to decide whether to fetch company data for a LinkedIn profile.
 * The decision is returned through a callback.
 * @param {Function} callback - A callback function that receives a boolean indicating the user's decision.
 */
export const promptFetchCompanyLinkedInData = (callback: (fetch: boolean) => void): void => {
  rl.question(
    "💡 We detect that the user has a top position at a company.\n   Do you want to fetch company data? (Y/n): ",
    (answer: string) => {
      const trimmedAnswer = answer.trim().toLowerCase();
      if (trimmedAnswer === "y" || trimmedAnswer === "") {
        callback(true);
      } else if (trimmedAnswer === "n") {
        callback(false);
      } else {
        console.log(chalk.red("Invalid option. Please type 'Y' for Yes or 'n' for No."));
        promptFetchCompanyLinkedInData(callback);
      }
    }
  );
};
