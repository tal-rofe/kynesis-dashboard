import { prompts } from "../data/prompts";

/**
 * Type representing the keys of the `prompts` object.
 *
 * This type is used to ensure type safety and consistency when referencing prompt types throughout the application.
 * Each key corresponds to a specific type of prompt defined in the `prompts` object, enabling dynamic selection
 * and usage of prompts based on user input or application logic.
 *
 * Utilizing this type allows for compile-time checks against the available prompts, reducing the likelihood
 * of runtime errors due to typos or referencing undefined prompt types.
 */
export type PromptTypes = keyof typeof prompts;
