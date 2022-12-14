<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS OAuth2</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

<p align="center">🥰 Any kinds of contributions are welcome! 🥰</p>

---

# Features

# Installation

```
yarn add nestjs-oauth2
```

# Usage

Please refer to the [example](/example/nestjs-oauth2-example/) for more details.

## Settings

### Import `OAuthModule`

Import the module at your app module.

```typescript
import { OAuthModule, spotifyOptions, googleOptions } from "nestjs-oauth2";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OAuthModule.forFeatureAsync({
      useFactory: (config: ConfigService<Environments>) => [
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
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```
