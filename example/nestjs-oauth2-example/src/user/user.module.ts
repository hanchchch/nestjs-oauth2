import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuthModule, OAuthController, spotifyOptions } from "nestjs-oauth2";
import { UserRepository } from "./user.repository";

@Module({
  imports: [
    OAuthModule.forFeatureAsync({
      useFactory: (config: ConfigService) => ({
        providers: [
          {
            ...spotifyOptions,
            clientId: config.get("SPOTIFY_CLIENT_ID"),
            clientSecret: config.get("SPOTIFY_CLIENT_SECRET"),
            scope: "user-read-private user-read-email",
            redirectUri: "http://localhost:3000/oauth/spotify/callback",
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserRepository],
  controllers: [OAuthController],
})
export class UserModule {}
