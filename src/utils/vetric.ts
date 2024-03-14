import { linkedinApis } from "../apis/linkedin";
import { facebookApis } from "../apis/facebook";
import { VetricService } from "../services/vetric-service";
import chalk from "chalk";

/**
 * Fetch LinkedIn data based on a given identifier and scope.
 *
 * @param identifier - The unique identifier for the LinkedIn entity (user or company).
 * @param scope - The type of data to fetch, e.g., 'profile' or 'company'.
 */
export const fetchLinkedInData = async (identifier: string, scope: keyof typeof linkedinApis) => {
  if (!process.env.VETRIC_API_KEY) {
    console.error("🔑 Could not find Vetric API key. Please add it to your environment variables.");
    return;
  }

  try {
    const linkedInService = new VetricService({
      identifier,
      platform: "linkedin",
      scope,
    });

    const allData: any = {};
    const paths = linkedinApis[scope];

    const results = await Promise.all(paths.map(({ path }) => linkedInService.get(path)));

    paths.forEach((item, index) => {
      allData[item.key] = results[index];
    });

    console.log(chalk.bold.green(`\n\n\n🚀 LinkedIn ${scope} data fetched successfully\n\n`));
    console.log(allData);
    return allData;
  } catch (error) {
    console.error("Error fetching LinkedIn data:", error);
    throw new Error("Failed to fetch LinkedIn data");
  }
};

/**
 * Fetches company data from LinkedIn for a given identifier.
 * This function specifically targets company-related data paths within LinkedIn,
 * ensuring that data fetched is relevant to the company aspect of LinkedIn profiles.
 *
 * @param identifier - The unique identifier for the company on LinkedIn.
 * @returns An object containing all fetched company data, keyed by data type.
 */
export const fetchFacebookData = async (identifier: string, scope: keyof typeof facebookApis) => {
  if (!process.env.VETRIC_API_KEY) {
    console.error("🔑 Could not find Vetric API key. Please add it to your environment variables.");
    return;
  }

  try {
    const linkedInService = new VetricService({
      identifier: identifier,
      platform: "facebook",
      scope: scope,
    });

    const allData: any = {};

    const paths = facebookApis[scope];
    const results = await Promise.all(paths.map(({ path }) => linkedInService.get(path)));

    paths.forEach((item, index) => {
      allData[item.key] = results[index];
    });

    console.log(chalk.bold.green(`\n\n\n🚀 Facebook ${scope} data fetched successfully\n\n`));

    return allData;
  } catch (error) {
    console.error("Error fetching company data:", error);
    throw new Error("Failed to fetch company data");
  }
};
