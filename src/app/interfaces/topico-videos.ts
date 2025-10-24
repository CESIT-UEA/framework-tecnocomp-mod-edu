import { VideoUrl } from './video-url';

export interface TopicoVideos {
  id: number;
  id_modulo: number;
  nome_topico: string;
  ebookUrlGeral: string;
  textoApoio: string;
  VideoUrls: VideoUrl[]; // array de vídeos do tópico
}