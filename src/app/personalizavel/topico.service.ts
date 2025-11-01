import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VideoUrl } from '../interfaces/video-url';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private baseUrlLTI = environment.baseUrl;
  dados_topico: Topico[] = [];
  private dadosTopicoSubject = new BehaviorSubject<Topico[] | null>(null);
  dadosTopico$ = this.dadosTopicoSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserTopicoInfo(id_modulo: number, id_aluno: number, ltik: string): Observable<Topico[]>{
      return this.http.get<Topico[]>(`${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`)
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

    get dadosTopico(): Topico[] | null {
      return this.dadosTopicoSubject.value;
    }

    getDadosTopicosStorage(): void {
      const dados = localStorage.getItem('userTopico')
      if (dados){
        this.dados_topico = JSON.parse(dados)
      }
  }
}
