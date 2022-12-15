import { ModuleMetadata } from "@nestjs/common";

export interface OAuthProvider {
  name: string;
  clientId: string;
  clientSecret: string;
  authorizeUrl: string;
  accessTokenUrl: string;
  redirectOrigin?: string;
  redirectUri?: string;
  scope?: string;
}

export interface OAuthModuleOptions {
  providers: OAuthProvider[];
}

export interface OAuthModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory: (
    ...args: any[]
  ) => Promise<OAuthModuleOptions> | OAuthModuleOptions;
  inject?: any[];
}

export interface RawOAuthTokenResponse {
  token_type: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface OAuthTokenResponse {
  tokenType: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
