import axios from "axios";
import * as dotenv from "dotenv";
import { VetricServiceType } from "../types/vetric";
import { facebookApis } from "../apis/facebook";
import { linkedinApis } from "../apis/linkedin";
import type { HttpMethod, ResponseData } from "../types/http";
dotenv.config();

const axiosInstance = axios.create({
  headers: {
    "x-api-key": process.env.VETRIC_API_KEY,
  },
});

/**
 * Represents a service for interacting with LinkedIn or Facebook APIs.
 * This service allows fetching data from the specified platform using API paths defined in external configurations.
 * @template T - The type of platform, either 'linkedin' or 'facebook'.
 */
class VetricService<T extends "linkedin" | "facebook"> {
  private identifier: string;
  private platform: T;
  private scope: T extends "linkedin" ? keyof typeof linkedinApis : keyof typeof facebookApis;

  constructor({ identifier, platform, scope }: VetricServiceType<T>) {
    this.identifier = identifier;
    this.platform = platform;
    this.scope = scope;

    if (!process.env.VETRIC_API_KEY || !process.env.VETRIC_BASE_URL) {
      console.error("The necessary environment variables are missing or empty.");
      process.exit(1);
    }
  }

  private getPath(): string[] {
    if (this.platform === "linkedin") {
      return linkedinApis[this.scope as keyof typeof linkedinApis].map((p) => p.path);
    } else {
      return facebookApis[this.scope as keyof typeof facebookApis].map((p) => p.path);
    }
  }

  public async fetcher<R = unknown>(method: HttpMethod, pathKey: string): Promise<ResponseData<R>> {
    const paths = this.getPath();
    const path = paths.find((p) => p.includes(pathKey));

    if (!path) {
      throw new Error("Path not found for the given key");
    }

    const url = `${process.env.VETRIC_BASE_URL}/${this.platform}/v1/${this.scope}/${this.identifier}/${path}`;
    const response = await axiosInstance.request<ResponseData<R>>({
      url,
      method,
    });

    return response.data;
  }

  public async get<R = unknown>(pathKey: string): Promise<ResponseData<R>> {
    return this.fetcher<R>("GET", pathKey);
  }
}

export { VetricService };
