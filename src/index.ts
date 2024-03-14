import { extractLinkedinIdentifier } from "./utils/extractors";
import { fetchLinkedInData } from "./utils/vetric";
import { openaiIntegration } from "./utils/openai";
import {
  promptLinkedInUrl,
  promptFetchCompanyLinkedInData,
  selectOpenaiServicePromptType,
} from "./utils/cli";
import { type PromptTypes } from "./types/prompts";
const Spinner = require("cli-spinner").Spinner;

/**
 * Main function to orchestrate LinkedIn data retrieval and processing.
 * It prompts the user for a LinkedIn URL, extracts data, and optionally fetches company data
 * before integrating with OpenAI services based on user-selected options.
 */
const main = async (): Promise<void> => {
  promptLinkedInUrl(async (finalUrl) => {
    const spinner = new Spinner("Mmm sounds a bit fishy..🧀 %s");
    spinner.setSpinnerString("|/-\\");
    spinner.start();

    try {
      const userIdentifier = extractLinkedinIdentifier(finalUrl);

      if (!userIdentifier) {
        throw new Error("Invalid LinkedIn URL. Please provide a valid LinkedIn profile URL.");
      }

      const userLinkedInData = await fetchLinkedInData(userIdentifier, "profile");

      spinner.stop(true);
      promptFetchCompanyLinkedInData(async (fetch) => {
        spinner.start();

        if (fetch && userLinkedInData.overview.top_position?.company_info) {
          const companyUrl = userLinkedInData.overview.top_position.company_info.url;
          const companyIdentifier = extractLinkedinIdentifier(companyUrl);

          if (!companyIdentifier) {
            throw new Error("Invalid LinkedIn company URL. Please provide a valid LinkedIn company URL.");
          }

          const companyLinkedInData = await fetchLinkedInData(companyIdentifier, "company");
          userLinkedInData.topPositionCompany = companyLinkedInData;
        }

        spinner.stop(true);

        selectOpenaiServicePromptType((err, selectedPromptType) => {
          if (err) {
            console.error(err.message);
            return;
          }

          console.log(`You selected: ${selectedPromptType}`);
          openaiIntegration(userLinkedInData, selectedPromptType as PromptTypes);
        });
      });
    } catch (error) {
      console.error("An error occurred:", error);
      spinner.stop(true);
    }
  });
};

main();
