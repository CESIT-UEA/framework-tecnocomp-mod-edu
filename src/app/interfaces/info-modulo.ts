import { Modulo } from "./modulo";
import { User } from "./user";
import { UserModulo } from "./user-modulo";

export interface DadosModulo {
  user: User;
  modulo: Modulo;
  userModulo: UserModulo;
}