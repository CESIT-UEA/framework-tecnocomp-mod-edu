import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
    this.apiService.removeDadosCompletos()
    this.apiService.getDadosCompletos()
    
    if (this.apiService.dados_completos.length !== 0) {
      this.nomeModulo = this.apiService.dados_completos.modulo.nome_modulo
    }

    // https://tecnocomp.uea.edu.br:5678/webhook/8e3b74b3-5941-4a21-a583-c07d8c45c1cb/chat/${this.nomeModulo}

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
