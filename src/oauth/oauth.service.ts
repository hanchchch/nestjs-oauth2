import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { OAuthImplement } from "./oauth.implement";
import { OAuthModuleOptions } from "./oauth.interfaces";
import { OAUTH_OPTIONS } from "./oauth.symbols";

@Injectable()
export class OAuthService {
  private oauthMap: {
    [key: string]: OAuthImplement;
  } = {};

  constructor(
    @Inject(OAUTH_OPTIONS) private readonly options: OAuthModuleOptions,
  ) {
    this.options.providers.forEach((provider) => {
      this.oauthMap[provider.name] = new OAuthImplement(provider);
    });
  }

  with(provider: string): OAuthImplement {
    const oauth = this.oauthMap[provider];
    if (!oauth) {
      throw new NotImplementedException(
        `OAuth provider ${provider} not implemented`,
      );
    }
    return oauth;
  }
}
