import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { filter, take } from 'rxjs';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-chat-n8n',
  templateUrl: './chat-n8n.component.html',
  styleUrls: ['./chat-n8n.component.css'],
})
export class ChatN8nComponent implements OnInit {
  private chatScript!: HTMLScriptElement;
  private nomeModulo!: string;

  constructor(private renderer: Renderer2, private apiService: ServiceAppService) {}

  ngOnInit(): void {
    this.apiService.getDadosCompletosAsObservable()
    this.apiService.dadosCompletos$
      .pipe(filter(d => !!d && !!d.modulo?.nome_modulo), take(1))
      .subscribe(dados => {
        this.nomeModulo = dados.modulo.nome_modulo;
        this.inicializarChat();
      });
  }


  inicializarChat(){
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    this.renderer.appendChild(document.head, link);
    this.chatScript = this.renderer.createElement('script');
    this.chatScript.type = 'module';
    this.chatScript.text = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://tecnocomp.uea.edu.br:5678/webhook/c3f42851-79f7-4579-ad10-a24e53ddb10b/chat',
        metadata: {
          modulo: '${this.nomeModulo}'
        },
  initialMessages: [
    'Seja bem vindo! 👋',
    'Inicie uma conversa com nosso assistente.'
  ],
  i18n: {
    en: {
      title: 'Olá 👋',
      subtitle: "Inicie uma conversa com nosso assistente.",
      footer: 'Powered by UEA Chat 🤖',
      getStarted: 'Nova Conversa',
      inputPlaceholder: 'Digite sua dúvida...',
    },
  },
  });
  `;
      this.renderer.appendChild(document.body, this.chatScript);
  }

}
