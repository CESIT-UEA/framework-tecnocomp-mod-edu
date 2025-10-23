import { User } from "./user";

export interface UsuarioTopico {
  id: number;
  id_aluno: number;
  id_topico: number;
  nota: number;
  encerrado: boolean;
  resposta_errada: string | null;
  indice_video: number | null;
  isTextoApoio: boolean;
  isSaibaMais: boolean;
  isReferencias: boolean;
  resposta_aberta_aluno: string | null;
  resposta_aberta_nota_IA: number | null;
  resposta_aberta_justificativa_IA: string | null;
  resposta_aberta_teto: number | null;
  Aluno: User;
}