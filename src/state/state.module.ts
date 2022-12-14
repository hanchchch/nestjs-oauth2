import { Module } from "@nestjs/common";
import { DefaultStateService } from "./default.state-service";
import { OAUTH_STATE_SERVICE } from "./state.symbols";

@Module({
  imports: [],
  providers: [{ provide: OAUTH_STATE_SERVICE, useClass: DefaultStateService }],
  exports: [OAUTH_STATE_SERVICE],
})
export class StateModule {}
