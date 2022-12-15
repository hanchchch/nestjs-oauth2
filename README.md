<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS OAuth2</h3>

---

# Features

- Fully customizable OAuth2 provider configuration.
  - Configure any OAuth2 providers with ease, even for your custom OAuth2 servers.
    ```typescript
    {
      name: "spotify",
      authorizeUrl: "https://accounts.spotify.com/authorize",
      accessTokenUrl: "https://accounts.spotify.com/api/token",
      clientId: "<spotifyClientId>",
      clientSecret: "<spotifyClientSecret>",
      scope: "user-read-private user-read-email",
      redirectUri: "http://localhost:4200/oauth/spotify/callback",
    }
    ```
- Injectable OAuth2 service which can be multiplexed to providers.
  - Inject `OAuthService` to build your own OAuth2 flow [like this](/src/oauth/oauth.controller.ts).
    ```typescript
    this.oauthService.with(provider).getAccessToken({ code });
    ```
- Or, just use the built-in OAuth2 flow by injecting `OAuthController` to your app.
  - and then call `GET /oauth/:provider` to start OAuth2 flow.

# Installation

```
yarn add nestjs-oauth2
```

# Usage

Please refer to the [example](/example/nestjs-oauth2-example/) for more details.

## Settings

### `OAuthModule.forFeature`

Import the module at your app module. Configure the OAuth providers you want to use.
Check interface [OAuthProvider](/src/oauth/oauth.interfaces.ts#L3) for more details.

```typescript
import { OAuthModule, spotifyOptions, googleOptions } from "nestjs-oauth2";

@Module({
  imports: [
    OAuthModule.forFeature({
      providers: [
        {
          ...spotifyOptions,
          clientId: "<spotifyClientId>",
          clientSecret: "<spotifyClientSecret>",
          scope: "user-read-private user-read-email",
          redirectUri: "http://localhost:4200/oauth/spotify/callback",
        },
        {
          ...googleOptions,
          clientId: "<googleClientId>",
          clientSecret: "<googleClientSecret>",
          scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
          redirectUri: "http://localhost:4200/oauth/google/callback",
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

### `OAuthModule.forFeatureAsync`

You can also use `OAuthModule.forFeatureAsync` to configure the providers asynchronously.
This way you can hide your client secrets from code. It's recommended to use this method.

```typescript
import { OAuthModule, spotifyOptions, googleOptions } from "nestjs-oauth2";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OAuthModule.forFeatureAsync({
      useFactory: (config: ConfigService) => ({
        providers: [
          {
            ...spotifyOptions,
            clientId: config.get("SPOTIFY_CLIENT_ID"),
            clientSecret: config.get("SPOTIFY_CLIENT_SECRET"),
            scope: "user-read-private user-read-email",
            redirectUri: "http://localhost:4200/oauth/spotify/callback",
          },
          {
            ...googleOptions,
            clientId: config.get("GOOGLE_CLIENT_ID"),
            clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
            scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
            redirectUri: "http://localhost:4200/oauth/google/callback",
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## Inject `OAuthController`

Inject `OAuthController` to your app controller. You can use the built-in OAuth2 flow.
In this case, please specify the `redirectOrigin` (root endpoint of your server e.g. http://localhost:3000/api)
instead of `redirectUri` in the provider settings.
`OAuthModule` will automatically resolves the `redirectUri` from the `redirectOrigin`.

```typescript
import { OAuthModule, OAuthController, googleOptions } from "nestjs-oauth2";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OAuthModule.forFeatureAsync({
      useFactory: (config: ConfigService) => ({
        providers: [
          {
            ...googleOptions,
            clientId: config.get("GOOGLE_CLIENT_ID"),
            clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
            scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
            redirectOrigin: "http://localhost:4200",
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, OAuthController],
  providers: [],
})
export class AppModule {}
```

To start OAuth2 flow, just call `GET /oauth/:provider`.

```log
LOG [RoutesResolver] OAuthController {/oauth}: +3ms
LOG [RouterExplorer] Mapped {/oauth/:provider, GET} route +1ms
LOG [RouterExplorer] Mapped {/oauth/:provider/callback, GET} route +0ms
LOG [RouterExplorer] Mapped {/oauth/:provider/refresh, GET} route +1ms
```

## Inject `OAuthService`

Inject `OAuthService` with decorator `InjectOAuth`. You can use the OAuth2 service to build your own OAuth2 flow.

```typescript
import { OAuthService, InjectOAuth } from "nestjs-oauth2";

@Controller(`users`)
export class UsersController {
  constructor(@InjectOAuth() private readonly oauthService: OAuthService) {}

  @Get(`:provider`)
  oauthStart(@Param(`provider`) provider: string, @Res() res: Response) {
    res.redirect(
      this.oauthService.with(provider).getAuthorizeUrl({ state: randomUUID() }),
    );
  }
}
```
