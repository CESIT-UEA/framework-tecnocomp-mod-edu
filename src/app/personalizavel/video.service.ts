import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { VideoUrl } from '../interfaces/video-url';
import { HttpClient } from '@angular/common/http';
import { TopicoVideos } from '../interfaces/topico-videos';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrlLTI = environment.baseUrl;
  dados_video!: TopicoVideos[]; 

  constructor(private http: HttpClient) { }


  getVideosUrlByModuloId(id_modulo: number, ltik: string): Observable<TopicoVideos[]>{
    console.log(`requisição videos: ${this.baseUrlLTI}/videosUrl?ltik=${ltik}&id_modulo=${id_modulo}`)
    return this.http.get<TopicoVideos[]>(`${this.baseUrlLTI}/videosUrl?ltik=${ltik}&id_modulo=${id_modulo}`)
  }

  setDadosVideo(dados: TopicoVideos[]){
    localStorage.setItem('videosUrl', JSON.stringify(dados))
  }

  getDadosVideo(){
    const dados_video = localStorage.getItem('videosUrl');
    if(dados_video){
      this.dados_video = JSON.parse(dados_video)
    }
  }

  limparCacheVideos(){
    localStorage.removeItem('videosUrl')
  }

}
