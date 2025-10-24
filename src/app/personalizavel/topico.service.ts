import { Injectable } from '@angular/core';
import { Topico } from '../interfaces/topico';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { VideoUrl } from '../interfaces/video-url';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private baseUrlLTI = environment.baseUrl;
  dados_topico!: Topico[];

  constructor(private http: HttpClient) { }

  getUserTopicoInfo(id_modulo: number, id_aluno: number, ltik: string): Observable<Topico[]>{
      console.log(`requisição sendo feita para ${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`, )
      return this.http.get<Topico[]>(`${this.baseUrlLTI}/userTopicoInfo?ltik=${ltik}&id_modulo=${id_modulo}&id_aluno=${id_aluno}`)
    }

  getDadosUserTopico(): Topico[]{
    let dados = localStorage.getItem('userTopico');
    if (dados){
      this.dados_topico = JSON.parse(dados)
    }
    return this.dados_topico
  }


}
