import { facebookApis } from "../apis/facebook";
import { linkedinApis } from "../apis/linkedin";

/**
 * Type alias for LinkedIn API scopes, derived from the keys of the `linkedinApis` object.
 * Represents the different areas or features of the LinkedIn API that can be accessed.
 */
type VetricLinkedinScopes = keyof typeof linkedinApis;

/**
 * Type alias for Facebook API scopes, derived from the keys of the `facebookApis` object.
 * Represents the different areas or features of the Facebook API that can be accessed.
 */
type FacebookScopes = keyof typeof facebookApis;

/**
 * Defines the supported platforms for the Vetric service.
 * Currently, LinkedIn and Facebook are supported.
 */
export type VetricPlatforms = "linkedin" | "facebook";

/**
 * Generic type for configuring a service in the Vetric platform.
 * This configuration includes the unique identifier for the entity (e.g., user, page),
 * the platform (LinkedIn or Facebook), and the specific API scope (area/feature) to be accessed.
 *
 * The `scope` type depends on the platform: it uses `VetricLinkedinScopes` for LinkedIn and
 * `FacebookScopes` for Facebook, ensuring type safety and context-relevant autocompletion.
 *
 * @template T - The platform type, restricted to either "linkedin" or "facebook".
 */
export type VetricServiceType<T extends VetricPlatforms> = {
  identifier: string;
  platform: T;
  scope: T extends "linkedin" ? VetricLinkedinScopes : T extends "facebook" ? FacebookScopes : never;
};
