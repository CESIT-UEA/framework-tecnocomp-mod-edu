import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VideoUrl } from '../interfaces/video-url';
import { InfoTopico } from '../interfaces/info-topico';
import { ModuloService } from './modulo.service';

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

  constructor(
    private http: HttpClient, 
    private moduloService: ModuloService
  ) { }

  inicializarTopico(): Observable<void>{
    this.moduloService.getDadosModuloStorage()
    
    const topicoStorage = localStorage.getItem('userTopico');
    if (topicoStorage){
      this.setDadosTopico(JSON.parse(topicoStorage))
      return of(void 0);
    } else {
      const modulo_id = this.moduloService.dados_modulo?.modulo?.id;
      const aluno_id = this.moduloService.dados_modulo?.user?.id_aluno;
      const ltik =  this.moduloService.dados_modulo?.user?.ltik

      return this.getUserTopicoInfo(modulo_id, aluno_id, ltik, this.moduloService.controll_topico + 1).pipe(
        tap((topico: Topico[]) => {
          this.setDadosTopico(topico) 
        }),
        map(() => void 0)
      )
    }
  }

  getUserTopicoInfo(id_modulo: number, id_aluno: number, ltik: string, control_topico: number): Observable<Topico[]>{
    console.log(`requisição sendo feita para ${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}&control_topico=${control_topico}`)
      return this.http.get<Topico[]>(
        `${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}&topico=${control_topico}`)
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
    localStorage.setItem('infoTopicos', JSON.stringify(dados))
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

  getDadosInfoTopicosStorage(): void {
    const dados = localStorage.getItem('infoTopicos')
    if (dados){
      this.info_topicos= JSON.parse(dados)
    }
  }

  limparCacheTopico(){
    localStorage.removeItem('userTopico');
    localStorage.removeItem('videosUrl');
    localStorage.removeItem('saiba_mais');
    localStorage.removeItem('referencias')
  }
}
