import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AprendizagemEInformaticaService } from '../../aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-construcionismo',
  templateUrl: './construcionismo.component.html',
  styleUrls: ['../behaviorismo/behaviorismo.component.css'],
})
export class ConstrucionismoComponent {
  teste = 2;
  nome = 'Construcionismo';
  constructor(
    private router: Router,
    public aprendizagemInformatica: AprendizagemEInformaticaService,
    public ltiService:ServiceAppService
  ) {}
  arrayVideos: string[] = [
    'https://www.youtube.com/embed/poWicP3Ddd4?si=aTq8--T_HjYpkz53',
    'https://www.youtube.com/embed/AfFTOTx0K4I?si=JLs1naJQolh1i-Xq',
  ];

  arrayReferencias: string[] = [
    'BOSI, Alfredo. Historia concisa da literatura brasileira. 38. ed. São Paulo: Cortes, 2002',
    'BOSI, Alfredo. Historia concisa da literatura brasileira. 38. ed. São Paulo: Cortes, 2002',
    'BOSI, Alfredo. Historia concisa da literatura brasileira. 38. ed. São Paulo: Cortes, 2002',
  ];
  arrayLinks: string[] = [
    'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR91199G0&p=saiba+mais+uea',
    'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR91199G0&p=saiba+mais+uea',
    'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR91199G0&p=saiba+mais+uea',
    'https://br.search.yahoo.com/search?fr=mcafee&type=E210BR91199G0&p=saiba+mais+uea',
  ];

  pergunta: string =
    'Aprendemos na aula anterior que existem três passos principais para definir uma boa estratégia. Quais são eles?';

  controllerSwitch: number = 0;

  atividadeClick() {
    this.controllerSwitch = this.controllerSwitch == 0 ? 1 : 0;
  }

  referenciasClick() {
    this.controllerSwitch = this.controllerSwitch == 0 ? 2 : 0;
  }

  linksClick() {
    this.controllerSwitch = this.controllerSwitch == 0 ? 3 : 0;
  }

  textoApoioClick() {
    this.controllerSwitch = this.controllerSwitch == 0 ? 4 : 0;
  }

  navigation() {
    this.router.navigate(['teorias-da-aprendizagem/socioconstrutivismo']);
  }

  navigationVoltar() {
    this.router.navigate(['teorias-da-aprendizagem/construtivismo']);
  }

  minhaQuestao = {
    titulo: 'Aprendemos na aula anterior que existem três passos principais para definir uma boa estratégia. Quais são eles?',
    alternativas: [
      {
        descricao: 'Azul',
        explicacao: 'Lorem ipsum dolor sit amet consectetur. Erat quis luctus sed semper volutpat congue turpis.',
        correta: false,
      },
      {
        descricao: 'Vermelho',
        explicacao: 'Lorem ipsum dolor sit amet consectetur. Erat quis luctus sed semper volutpat congue turpis.',
        correta: false,
      },
      {
        descricao: 'Verde',
        explicacao: 'Lorem ipsum dolor sit amet consectetur. Erat quis luctus sed semper volutpat congue turpis.',
        correta: true,
      },
      {
        descricao: 'Laranja',
        explicacao: 'Lorem ipsum dolor sit amet consectetur. Erat quis luctus sed semper volutpat congue turpis.',
        correta: false,
      },
    ],
    respostaCorreta: 'Verde',
  };
}
