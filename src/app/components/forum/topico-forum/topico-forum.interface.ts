export interface TopicoF {
  /**
   * id do tópico do forum
   */
  id_topico_forum:number;

  id_forum: number;

  descricao:string;

  titulo:string;

  criado:Date;

  resolvido: boolean;

  id_autor: number;

  /**
   * data de criação do topico
   */
  createdAt: Date;
  /**
   * data de alteração do topico
   */
  updatedAt: Date;
}
