import { UsuarioTopico } from "./usuario-topico";

export interface Topico {
  id: number;
  id_modulo: number;
  nome_topico: string;
  ebookUrlGeral: string;
  textoApoio: string;
  UsuarioTopicos: UsuarioTopico[];
}