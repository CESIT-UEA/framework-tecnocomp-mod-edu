import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DadosModulo } from '../interfaces/info-modulo';
import { Topico } from '../interfaces/topico';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private baseUrlLTI = environment.baseUrl;
  private nomeTopicoSource = new BehaviorSubject<string>('');
  nomeTopico$ = this.nomeTopicoSource.asObservable();
  id_modulo!:string

  public dados_modulo!: DadosModulo;  
  storageKey = "dados_modulo"
  tokenStorage = localStorage.getItem('token')

  urlInicio!: string;
  topicos: any;
  bloqueio: any;
  informacoes: any;
  quantidadeTopicos!: number;
  notaTotal!: number;
  controll_topico:number = 0;

  constructor(private http: HttpClient) {}
  getUserInfo(ltik: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlLTI}/userInfo?ltik=${ltik}`);
  }

  getModuloInfo(ltik: string): Observable<DadosModulo> {
    return this.http.get<any>(`${this.baseUrlLTI}/moduloInfo?ltik=${ltik}`)
  }


  getModuloPorNome(nomeModulo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlLTI}/modulos?nome_modulo=${nomeModulo}`);
  }

  setNomeTopico(nomeTopico: string) {
    this.nomeTopicoSource.next(nomeTopico);
  }

  setDadosModulo(dados: DadosModulo){
    localStorage.setItem(this.storageKey, JSON.stringify(dados));
    this.getDadosModuloStorage()
  }

  getDadosModuloStorage(): void {
    const dados = localStorage.getItem(this.storageKey)
    if (dados){
      this.dados_modulo = JSON.parse(dados)
      this.notaTotal = this.dados_modulo?.userModulo?.nota;
    }
  }
}
