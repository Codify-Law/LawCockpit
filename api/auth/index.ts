import axios from "@/lib/axios";
import { ProfileResponse, SignInRequest, SignInResponse } from "./types";

/**
 * Authenticates a user with their credentials
 * @param credentials - The user's sign in credentials
 * @returns Promise containing the sign in response with auth tokens
 */
export const authenticate = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  const response = await axios.post<SignInResponse>(
    "/users/login",
    credentials
  );
  return response.data;
};

/**
 * Fetches the current authenticated user's profile
 * @returns Promise containing the user's profile data
 */
export const profile = async () => {
  const response = await axios.get<ProfileResponse>("/users/me");
  return response.data;
};
