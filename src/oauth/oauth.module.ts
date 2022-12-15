import { DynamicModule, Module, Provider } from "@nestjs/common";
import { DefaultStateService } from "../state/default.state-service";
import { StateModule } from "../state/state.module";
import { StateService } from "../state/state.service";
import { OAUTH_STATE_SERVICE } from "../state/state.symbols";
import {
  OAuthModuleAsyncOptions,
  OAuthModuleOptions,
} from "./oauth.interfaces";
import { OAuthService } from "./oauth.service";
import { OAUTH_OPTIONS, OAUTH_SERVICE } from "./oauth.symbols";

@Module({})
export class OAuthModule {
  static forFeature(options: OAuthModuleOptions): DynamicModule {
    const oauthService = this.createOAuthServiceProvider();
    const stateService = this.createStateServiceProvider();

    return {
      module: OAuthModule,
      imports: [StateModule],
      providers: [
        ...this.createOAuthConfigProvider(options),
        oauthService,
        stateService,
      ],
      exports: [oauthService, stateService],
    };
  }

  static forFeatureAsync(options: OAuthModuleAsyncOptions): DynamicModule {
    const oauthService = this.createOAuthServiceProvider();
    const stateService = this.createStateServiceProvider();

    return {
      module: OAuthModule,
      imports: [StateModule],
      providers: [
        ...this.createOAuthConfigAsyncProvider(options),
        oauthService,
        stateService,
      ],
      exports: [oauthService, stateService],
    };
  }

  private static createOAuthConfigProvider(
    options: OAuthModuleOptions,
  ): Provider<OAuthModuleOptions>[] {
    return [
      {
        provide: OAUTH_OPTIONS,
        useValue: options,
      },
    ];
  }

  private static createOAuthConfigAsyncProvider(
    options: OAuthModuleAsyncOptions,
  ): Provider<OAuthModuleOptions>[] {
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

  private static createStateServiceProvider(): Provider<StateService> {
    return {
      provide: OAUTH_STATE_SERVICE,
      useClass: DefaultStateService,
    };
  }
}
