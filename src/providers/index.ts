import { OAuthProviderOptions } from "./provider.interface";

export const spotifyOptions: OAuthProviderOptions = {
  provider: "spotify",
  authorizeUrl: "https://accounts.spotify.com/authorize",
  accessTokenUrl: "https://accounts.spotify.com/api/token",
};

export const googleOptions: OAuthProviderOptions = {
  provider: "google",
  authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  accessTokenUrl: "https://oauth2.googleapis.com/token",
};
