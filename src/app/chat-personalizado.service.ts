import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatPersonalizadoService {
  private chatUrl =  "https://tecnocomp.uea.edu.br:5678/webhook/disparo-chat";

  constructor(private http: HttpClient) {
  }

  enviarMensagemParaChat(mensagem: string): Observable<any>{
    return this.http.post<any>(this.chatUrl, { mensagem });
}
}
