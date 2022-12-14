import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { State } from "./state.interface";
import { StateService } from "./state.service";

@Injectable()
export class DefaultStateService implements StateService {
  async create(): Promise<State> {
    return { state: randomUUID(), createdAt: new Date() };
  }

  async verify(state: string): Promise<boolean> {
    return true;
  }
}
