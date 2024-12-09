import { Component } from '@angular/core';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
    cards = [
        {
          titulo: "Objetivo",
          descricao: ["Estudantes na faixa de 16 a 20 anos", "Professores de escolas"],
          urlImagem: ""
        },
        {
          titulo: "Público-Alvo",
          descricao: ["Estudantes na faixa de 16 a 20 anos", "Professores de escolas"],
          urlImagem: ""
        },
        {
          titulo: "Objetivo",
          descricao: ["Estudantes na faixa de 16 a 20 anos", "Professores de escolas"],
          urlImagem: ""
        }
    ]

    /**
   * Vetor de Objetos os quais guarda as informações das equipes e de seus membros
   */
  cardEquipes = [
    {
      equipe: 'Liderança e Gestão',
      membros: [
        {
          cargo: 'Coordenador Geral',
          nome: 'João da Mata',
                    image: 'https://tecnocomp.uea.edu.br/fotos/prof-joao.jpg'
        },
      ],
    },
    {
      equipe: 'Design e Experiência',
      membros: [
        {
          cargo: 'Designer Gráfico',
          nome: 'Adriene Chaves',
          image: 'https://tecnocomp.uea.edu.br/fotos/adriene.jpg'
        },
        {
          cargo: 'Designer UI/UX',
          nome: 'Lívia Monteiro',
        },
        {
          cargo: 'Designer Instrucional',
          nome: 'Jorge Coutinho',
                              image: 'https://tecnocomp.uea.edu.br/fotos/mikael.jpg'
        },
      ],
    },
    {
      equipe: 'Produção de Conteúdo e Ensino',
      membros: [
        {
          cargo: 'Instrutor(a)',
          nome: 'Yasmim Moraes',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/yasmin.jpg'
        },
        {
          cargo: 'Videomaker',
          nome: 'Jorge Coutinho',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/mikael.jpg'
        },
      ],
    },
    {
      equipe: 'Desenvolvimento e Tecnologia',
      membros: [
        {
          cargo: 'Desenvolvedor Frontend (1)',
          nome: 'Kauê Olímpio',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/kaue.jpg'
        },
        {
          cargo: 'Desenvolvedor Frontend (2)',
          nome: 'Andriw Santos',
        },
        {
          cargo: 'Desenvolvedor Full Stack',
          nome: 'Henrique Galvim',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/galvim.jpg'
        },
      ],
    },
    {
      equipe: 'Qualidade e Suporte',
      membros: [
        {
          cargo: 'Analista de testes',
          nome: 'Jhonathan Maia',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/jonatan.jpg'
        },
      ],
    },
    {
      equipe: 'Comunicação e Marketing',
      membros: [
        {
          cargo: 'Social Media',
          nome: 'Adriene Chaves',
                                        image: 'https://tecnocomp.uea.edu.br/fotos/adriene.jpg'
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
