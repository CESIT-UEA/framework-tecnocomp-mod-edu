import { Injectable } from '@angular/core';
import { Referencias } from '../interfaces/referencias';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {
  private baseUrlLTI = environment.baseUrl;
  referencias: Referencias[] = []

  constructor(private http: HttpClient) { }

  getReferencias(ltik: string): Observable<Referencias[]>{
    return this.http.get<Referencias[]>(`${this.baseUrlLTI}/referencias?ltik=${ltik}`)
  } 


  setReferenciasLocalStorage(dados: Referencias[]){
      localStorage.setItem('referencias', JSON.stringify(dados))
    }
  
    getReferenciasLocalStorage(): Referencias[]{
      console.log('Requisição para o storage referencias')
      const dados = localStorage.getItem('referencias');
      if (dados){
        this.referencias = JSON.parse(dados);
        return this.referencias
      }
      return []
    }

}
