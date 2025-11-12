import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { SaibaMais } from '../interfaces/saiba-mais';

@Injectable({
  providedIn: 'root'
})
export class SaibaMaisService {
  saiba_mais: SaibaMais[] = [];
  private baseUrlLTI = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getSaibaMais(ltik: string, id_topico: number): Observable<SaibaMais[]>{
    console.log('Requisição para o back saiba mais')
    return this.http.get<SaibaMais[]>(`${this.baseUrlLTI}/saibaMais?ltik=${ltik}&id_topico=${id_topico}`)
  }

  setSaibaMaisLocalStorage(dados: SaibaMais[]){
    localStorage.setItem('saiba_mais', JSON.stringify(dados))
  }

  getSaibaMaisLocalStorage(): SaibaMais[]{
    console.log('Requisição para o storage saiba mais')
    const dados = localStorage.getItem('saiba_mais');
    if (dados){
      this.saiba_mais = JSON.parse(dados);
      return this.saiba_mais
    }
    return []
  }

}
