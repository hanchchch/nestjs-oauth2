import { Inject } from "@nestjs/common";
import { OAUTH_SERVICE } from "./oauth.symbols";

export const InjectOAuth = () => Inject(OAUTH_SERVICE);
