import { DynamicModule, Module, Provider } from "@nestjs/common";
import { StateModule } from "../state/state.module";
import { OAuthController } from "./oauth.controller";
import { OAuthAsyncOptions, OAuthOptions } from "./oauth.interfaces";
import { OAuthService } from "./oauth.service";
import { OAUTH_OPTIONS, OAUTH_SERVICE } from "./oauth.symbols";

@Module({
  imports: [StateModule],
  controllers: [OAuthController],
})
export class OAuthModule {
  static forFeature(options: OAuthOptions[]): DynamicModule {
    const oauthService = this.createOAuthServiceProvider();
    return {
      module: OAuthModule,
      controllers: [],
      providers: [...this.createOAuthConfigProvider(options), oauthService],
      exports: [oauthService],
    };
  }

  static forFeatureAsync(options: OAuthAsyncOptions): DynamicModule {
    const oauthService = this.createOAuthServiceProvider();
    return {
      module: OAuthModule,
      controllers: [],
      providers: [
        ...this.createOAuthConfigAsyncProvider(options),
        oauthService,
      ],
      exports: [oauthService],
    };
  }

  private static createOAuthConfigProvider(
    options: OAuthOptions[],
  ): Provider<OAuthOptions[]>[] {
    return [
      {
        provide: OAUTH_OPTIONS,
        useValue: options,
      },
    ];
  }

  private static createOAuthConfigAsyncProvider(
    options: OAuthAsyncOptions,
  ): Provider<OAuthOptions[]>[] {
    return [
      {
        provide: OAUTH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }

  private static createOAuthServiceProvider(): Provider<OAuthService> {
    return {
      provide: OAUTH_SERVICE,
      useClass: OAuthService,
    };
  }
}
