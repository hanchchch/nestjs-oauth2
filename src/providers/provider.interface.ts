import { OAuthProvider } from "../oauth/oauth.interfaces";

export interface OAuthProviderPresets
  extends Omit<OAuthProvider, "clientId" | "clientSecret"> {}
