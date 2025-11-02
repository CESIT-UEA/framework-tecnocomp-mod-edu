import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VideoUrl } from '../interfaces/video-url';
import { InfoTopico } from '../interfaces/info-topico';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private baseUrlLTI = environment.baseUrl;
  dados_topico: Topico[] = [];
  info_topicos: InfoTopico[] = []

  private dadosTopicoSubject = new BehaviorSubject<Topico[] | null>(null);
  private infoTopicosSubject = new BehaviorSubject<InfoTopico[] | null>(null);

  dadosTopico$ = this.dadosTopicoSubject.asObservable();
  infoTopicos$ = this.infoTopicosSubject.asObservable()

  constructor(private http: HttpClient) { }

  getUserTopicoInfo(id_modulo: number, id_aluno: number, ltik: string): Observable<Topico[]>{
    console.log(`requisição sendo feita para ${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`)
      return this.http.get<Topico[]>(`${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`)
    }

  getInfoTopicos(id_modulo: number, id_aluno: number, ltik: string): Observable<InfoTopico[]>{
    return this.http.get<InfoTopico[]>(`${this.baseUrlLTI}/topicosInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`)
  }
  

  getDadosUserTopicoLocalStorage(): Topico[]{
    let dados = localStorage.getItem('userTopico');
    if (dados){
      this.dados_topico = JSON.parse(dados)
    }
    return this.dados_topico
  }

  setDadosUserTopicoLocaStorage(dados: Topico[]){
    localStorage.setItem('userTopico', JSON.stringify(dados))
  }

  setDadosTopico(dados: Topico[]){
    this.dadosTopicoSubject.next(dados)
    this.setDadosUserTopicoLocaStorage(dados)
  }

  setInfoTopicos(dados: InfoTopico[]){
    this.infoTopicosSubject.next(dados)
  }

  get dadosTopico(): Topico[] | null {
    return this.dadosTopicoSubject.value;
  }

  get infoTopicos(): InfoTopico[] | null {
    return this.infoTopicosSubject.value
  }

  getDadosTopicosStorage(): void {
    const dados = localStorage.getItem('userTopico')
    if (dados){
      this.dados_topico = JSON.parse(dados)
    }
  }
}
