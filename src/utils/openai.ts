import OpenAI from "openai";
import { prompts } from "../data/prompts";
import { PromptTypes } from "../types/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Integrates with OpenAI's API to generate responses based on a given prompt type and data.
 * This function constructs a prompt using predefined templates and user data, then requests a completion from OpenAI's model.
 *
 * @param {Record<string, any>} data - The user data to be included in the prompt. This data should be relevant to the prompt's context.
 * @param {PromptTypes} promptType - The type of prompt to use, which determines the template for the request.
 *
 * @returns {Promise<void>} - The function does not return a value but outputs the OpenAI response to the console.
 */
export const openaiIntegration = async (data: Record<string, any>, promptType: PromptTypes) => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("🔑 Could not find OpenAI API key. Please add it to your environment variables.");

    return;
  }

  if (process.env.SHOULD_USE_OPENAI_API === "false") {
    console.log(
      "🔒 OpenAI API is disabled. Enable it by setting the environment variable SHOULD_USE_OPENAI_API to true."
    );
    return;
  }

  const prompt = `${prompts[promptType]} user data: ${JSON.stringify(data)}`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  });
  const content = response.choices[0].message.content;
  console.log(content);
};
