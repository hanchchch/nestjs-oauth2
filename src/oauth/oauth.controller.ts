import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { InjectOAuthStateService } from "../state/state.decorators";
import { StateService } from "../state/state.service";
import { InjectOAuth } from "./oauth.decorators";
import { OAuthService } from "./oauth.service";

@Controller(`oauth`)
export class OAuthController {
  constructor(
    @InjectOAuth() private readonly oauthService: OAuthService,
    @InjectOAuthStateService() private readonly stateService: StateService,
  ) {}

  @Get(`:provider`)
  async oauthStart(@Param(`provider`) provider: string, @Res() res: Response) {
    const { state } = await this.stateService.create();
    res.redirect(this.oauthService.with(provider).getAuthorizeUrl({ state }));
  }

  @Get(`:provider/callback`)
  oauthCallback(
    @Param(`provider`) provider: string,
    @Query(`code`) code: string,
    @Query(`state`) state: string,
  ) {
    const verified = this.stateService.verify(state);
    if (!verified) {
      throw new BadRequestException(`Invalid state`);
    }
    return this.oauthService.with(provider).getAccessToken({
      code,
    });
  }

  @Get(`:provider/refresh`)
  oauthRefresh(
    @Param(`provider`) provider: string,
    @Query(`refreshToken`) refreshToken: string,
  ) {
    return this.oauthService.with(provider).refreshAccessToken({
      refreshToken,
    });
  }
}
