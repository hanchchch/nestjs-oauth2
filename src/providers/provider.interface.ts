import { OAuthOptions } from "../oauth/oauth.interfaces";

export interface OAuthProviderOptions
  extends Omit<OAuthOptions, "clientId" | "clientSecret"> {}
