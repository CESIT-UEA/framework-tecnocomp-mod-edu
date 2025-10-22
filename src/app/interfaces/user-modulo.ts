export interface UserModulo {
  id: number;
  id_aluno: number;
  id_modulo: number;
  nota: number;
  progresso: number;
  ativo: boolean;
  url_retorno: string;
  avaliacao: string | null;
  comentario: string | null;
}