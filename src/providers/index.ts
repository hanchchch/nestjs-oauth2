import { OAuthProviderPresets } from "./provider.interface";

export const spotifyOptions: OAuthProviderPresets = {
  name: "spotify",
  authorizeUrl: "https://accounts.spotify.com/authorize",
  accessTokenUrl: "https://accounts.spotify.com/api/token",
};

export const googleOptions: OAuthProviderPresets = {
  name: "google",
  authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  accessTokenUrl: "https://oauth2.googleapis.com/token",
};
