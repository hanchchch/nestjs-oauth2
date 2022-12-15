import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { OAuthController, OAuthModule } from "src/oauth";
import { spotifyOptions } from "src/providers";
import * as request from "supertest";

describe("OAuthModule Initialization", () => {
  describe("forFeature", () => {
    it("should compile", async () => {
      @Controller()
      class TestController {
        @Get()
        get() {
          return "";
        }
      }
      @Module({
        imports: [
          OAuthModule.forFeature({
            providers: [
              {
                ...spotifyOptions,
                clientId: "clientId",
                clientSecret: "clientSecret",
                scope: "user-read-private user-read-email",
                redirectOrigin: "http://localhost:3000",
              },
            ],
          }),
        ],
        controllers: [TestController],
      })
      class TestModule {}

      const app = await NestFactory.create(TestModule);
      const server = app.getHttpServer();

      await app.init();
      await request(server).get("/").expect(200);
      await app.close();
    });
    it("should compile with oauth controller", async () => {
      @Module({
        imports: [
          OAuthModule.forFeature({
            providers: [
              {
                ...spotifyOptions,
                clientId: "clientId",
                clientSecret: "clientSecret",
                scope: "user-read-private user-read-email",
                redirectOrigin: "http://localhost:3000",
              },
            ],
          }),
        ],
        controllers: [OAuthController],
      })
      class TestModule {}

      const app = await NestFactory.create(TestModule);
      const server = app.getHttpServer();

      await app.init();
      await request(server).get("/oauth/spotify").expect(302);
      await app.close();
    });
  });
  describe("forFeatureAsync", () => {
    it("should compile", async () => {
      @Controller()
      class TestController {
        @Get()
        get() {
          return "";
        }
      }
      @Module({
        imports: [
          OAuthModule.forFeatureAsync({
            useFactory: () => ({
              providers: [
                {
                  ...spotifyOptions,
                  clientId: "clientId",
                  clientSecret: "clientSecret",
                  scope: "user-read-private user-read-email",
                  redirectOrigin: "http://localhost:3000",
                },
              ],
            }),
          }),
        ],
        controllers: [TestController],
      })
      class TestModule {}

      const app = await NestFactory.create(TestModule);
      const server = app.getHttpServer();

      await app.init();
      await request(server).get("/").expect(200);
      await app.close();
    });
    it("should compile with oauth controller", async () => {
      @Module({
        imports: [
          OAuthModule.forFeatureAsync({
            useFactory: () => ({
              providers: [
                {
                  ...spotifyOptions,
                  clientId: "clientId",
                  clientSecret: "clientSecret",
                  scope: "user-read-private user-read-email",
                  redirectOrigin: "http://localhost:3000",
                },
              ],
            }),
          }),
        ],
        controllers: [OAuthController],
      })
      class TestModule {}

      const app = await NestFactory.create(TestModule);
      const server = app.getHttpServer();

      await app.init();
      await request(server).get("/oauth/spotify").expect(302);
      await app.close();
    });
  });
});
