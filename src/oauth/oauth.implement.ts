import { OAuth2 } from "oauth";
import {
  OAuthOptions,
  OAuthTokenResponse,
  RawOAuthTokenResponse,
} from "./oauth.interfaces";

export class OAuthImplement {
  private readonly defaultRedirectUri: string;

  constructor(private readonly options: OAuthOptions) {
    // TODO port
    this.defaultRedirectUri = `${this.options.redirectOrigin}/oauth/${this.options.provider}/callback`;
  }

  getOAuth2({ mode }: { mode: "authorize" | "accessToken" }): OAuth2 {
    if (mode === "authorize") {
      return new OAuth2(
        this.options.clientId,
        this.options.clientSecret,
        new URL(this.options.authorizeUrl).origin,
        new URL(this.options.authorizeUrl).pathname,
      );
    }
    if (mode === "accessToken") {
      return new OAuth2(
        this.options.clientId,
        this.options.clientSecret,
        new URL(this.options.accessTokenUrl).origin,
        "",
        new URL(this.options.accessTokenUrl).pathname,
      );
    }
  }

  getAuthorizeUrl({ state }: { state: string }): string {
    return this.getOAuth2({ mode: "authorize" }).getAuthorizeUrl({
      response_type: "code",
      redirect_uri: this.options.redirectUri || this.defaultRedirectUri,
      state,
      scope: this.options.scope || "",
    });
  }

  getAccessToken({ code }: { code: string }): Promise<OAuthTokenResponse> {
    return new Promise((resolve, reject) => {
      this.getOAuth2({ mode: "accessToken" }).getOAuthAccessToken(
        code,
        {
          grant_type: "authorization_code",
          redirect_uri: this.options.redirectUri || this.defaultRedirectUri,
        },
        (
          err: unknown,
          accessToken: string,
          refreshToken: string,
          results: RawOAuthTokenResponse,
        ) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              accessToken,
              refreshToken,
              tokenType: results.token_type,
              expiresIn: results.expires_in,
              ...results,
            });
          }
        },
      );
    });
  }

  refreshAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<OAuthTokenResponse> {
    return new Promise((resolve, reject) => {
      this.getOAuth2({ mode: "accessToken" }).getOAuthAccessToken(
        refreshToken,
        {
          grant_type: "refresh_token",
        },
        (
          err: unknown,
          accessToken: string,
          refreshToken: string,
          results: RawOAuthTokenResponse,
        ) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              accessToken,
              refreshToken,
              tokenType: results.token_type,
              expiresIn: results.expires_in,
              ...results,
            });
          }
        },
      );
    });
  }
}
