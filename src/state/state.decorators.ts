import { Inject } from "@nestjs/common";
import { OAUTH_STATE_SERVICE } from "./state.symbols";

export const InjectOAuthStateService = () => Inject(OAUTH_STATE_SERVICE);
