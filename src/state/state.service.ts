import { State } from "./state.interface";

export interface StateService {
  create(): Promise<State>;
  verify(state: string): Promise<boolean>;
}
