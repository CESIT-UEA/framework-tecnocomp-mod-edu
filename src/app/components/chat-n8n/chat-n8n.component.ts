import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat-n8n',
  templateUrl: './chat-n8n.component.html',
  styleUrls: ['./chat-n8n.component.css'],
})
export class ChatN8nComponent implements OnInit, OnDestroy {
  private chatScript!: HTMLScriptElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    this.renderer.appendChild(document.head, link);

    this.chatScript = this.renderer.createElement('script');
    this.chatScript.type = 'module';
    this.chatScript.text = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://tecnocomp.uea.edu.br:5678/webhook/8e3b74b3-5941-4a21-a583-c07d8c45c1cb/chat',
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

  ngOnDestroy(): void {
    if (this.chatScript && this.chatScript.parentNode) {
      this.chatScript.parentNode.removeChild(this.chatScript);
    }

    const chatWidget = document.querySelector('n8n-chat-widget');
    if (chatWidget && chatWidget.parentNode) {
      chatWidget.parentNode.removeChild(chatWidget);
    }
  }
}
