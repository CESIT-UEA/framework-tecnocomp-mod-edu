import { Topico } from "./topico"
import { UsuarioVideo } from "./usuario-video"

export interface VideoUrl {
  id: number
  id_topico: number
  url: string,
  UsuarioVideos: UsuarioVideo[]
}