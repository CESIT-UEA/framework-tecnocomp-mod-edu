import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente Ficha Tecnica, a qual deve ser transformado em um componente reutilizavel, pois todo modulo tem sua ficha tecnica única
 */
@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css'],
})
export class FichaTecnicaComponent implements OnInit {
  constructor(public ltiService: ServiceAppService) {}

  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.ltiService.controllerSwitchHome = 1
  }

  /**
   * Vetor de Objetos os quais guarda as informações das equipes e de seus membros
   */
  cardEquipes = [
    {
      equipe: 'COORDENAÇÃO GERAL',
      membros: [
        {
          cargo: 'Coordenador',
          nome: 'João da Mata',
        },
      ],
    },
    {
      equipe: 'CONTEUDISTAS',
      membros: [
        {
          cargo: 'Conteudista',
          nome: 'Elisângela Oliveira',
        },
        {
          cargo: 'Conteudista',
          nome: 'Genarde Macedo',
        },
      ],
    },
    {
      equipe: 'EQUIPE DESENVOLVEDOR',
      membros: [
        {
          cargo: 'Desenvolvedor',
          nome: 'Henrique Galvim',
        },
        {
          cargo: 'Desenvolvedor',
          nome: 'Kaue Wallace',
        },
      ],
    },
    {
      equipe: 'DESIGNS',
      membros: [
        {
          cargo: 'Design Instrucional',
          nome: 'Jorge Mikael',
        },
        {
          cargo: 'UX/UI Design',
          nome: 'Livia Monteiro',
        },
        {
          cargo: 'Design Gráfico',
          nome: 'Ryan Pereira',
        },
      ],
    },
    {
      equipe: 'VIDEOMAKER',
      membros: [
        {
          cargo: 'videomaker',
          nome: 'Ronaldo Ewerton',
        },
      ],
    },
    {
      equipe: 'ESPECIALISTA H5P',
      membros: [
        {
          cargo: 'Especialista H5P',
          nome: 'Marcos Gabriel',
        },
      ],
    },
  ];
  /**
   * variável que controla a posição da equipe atual
   */
  currentVideoIndex: number = 0;

  /**
   * @ignore
   */
  teste = this.cardEquipes[this.currentVideoIndex];

  /**
   * @method
   * Método que retorna o número de membros da equipe da posição atual
   */
  elementMembros() {
    return this.cardEquipes[this.currentVideoIndex].membros.length;
  }

  /**
   * @method
   * método que controla o avanço para a próxima equipe
   */
  nextVideo() {
    if (this.currentVideoIndex + 1 == this.cardEquipes.length) {
      this.currentVideoIndex = this.cardEquipes.length - 1;

      return;
    } else {
      this.currentVideoIndex =
        (this.currentVideoIndex + 1) % this.cardEquipes.length;
    }
  }
  /**
   * @method
   * Método que controla o retorno para a equipe anterior
   */
  prevVideo() {
    if (this.currentVideoIndex == 0) {
      console.log('Oi');
    } else {
      this.currentVideoIndex =
        (this.currentVideoIndex - 1 + this.cardEquipes.length) %
        this.cardEquipes.length;
    }
  }

  /**
   * @method
   * @param index
   * Método que faz a variável que controla posição, receber um índice
   */
  selectVideo(index: number) {
    this.currentVideoIndex = index;
  }

  
}
