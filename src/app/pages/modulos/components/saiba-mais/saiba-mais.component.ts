import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente reutilizavel Saiba Mais, o qual deve, geralmente, ser chamado nas paginas gerais de vizualização dos vídeos, ficará no menu
 */
@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css'],
})


export class SaibaMaisComponent {
  /**
   * Variavel que receberá os links que serão inseridos pelo usuário
   */
  @Input() links!: any[];

  /**
   * Variavel faz a interligação entre os eventos
   */
  @Output() linksClick = new EventEmitter<void>();

  /**
   * Vetor de objeto com descrição e links de informações adicionais sobre um determinado tópico
   */
  saibaMais: any = [
    {
      descricao:
        'O que é Behaviorismo? Entenda um pouco da Psicologia Comportamental',
      url: 'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR714G91805&p=interroga%C3%A7%C3%A3o',
    },
    {
      descricao: 'Behaviorismo - o ser humano é realmente livre?',
      url: 'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR714G91805&p=interroga%C3%A7%C3%A3o',
    },
    {
      descricao:
        'O que é Behaviorismo? Entenda um pouco da Psicologia Comportamental',
      url: 'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR714G91805&p=interroga%C3%A7%C3%A3o',
    },
  ];
}
