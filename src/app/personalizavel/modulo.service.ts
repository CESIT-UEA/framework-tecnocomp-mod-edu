import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private baseUrlLTI = environment.baseUrl;
  private nomeTopicoSource = new BehaviorSubject<string>('');
  nomeTopico$ = this.nomeTopicoSource.asObservable();
  id_modulo!:string

  urlInicio!: string;
  topicos: any;
  bloqueio: any;
  informacoes: any;
  quantidadeTopicos!: number;
  notaTotal!: number;
  controll_topico:number = 0;

  constructor(private http: HttpClient) {}
  getUserInfo(ltik: string): Observable<any> {
    console.log(`Requisição LTI sendo feita para: ${this.baseUrlLTI}/userInfo?ltik=${ltik}`)
    return this.http.get<any>(`${this.baseUrlLTI}/userInfo?ltik=${ltik}`);
  }

  getModuloPorNome(nomeModulo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlLTI}/modulos?nome_modulo=${nomeModulo}`);
  }

  setNomeTopico(nomeTopico: string) {
    this.nomeTopicoSource.next(nomeTopico);
  }
}
