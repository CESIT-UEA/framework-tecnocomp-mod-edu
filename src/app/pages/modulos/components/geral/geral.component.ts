import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AprendizagemEInformaticaService } from '../../aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { Router } from '@angular/router';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css']
})
export class GeralComponent {
  constructor(public aprendizagemInformatica:AprendizagemEInformaticaService, private router:Router, public ltiService:ServiceAppService){
  }
  @Input() nome!:string
  @Input() videos!: string[];
  @Output() referenciasClick = new EventEmitter<void>();
  @Output() linksClick = new EventEmitter<void>();
  @Output() textoApoioClick = new EventEmitter<void>();
  @Output() atividadeClick = new EventEmitter<void>();

  @Input() link:number = 0;
  @Input() voltar!:string;
  @Input() proximo!:string;
  @Input() liberado:boolean = false

  navigation(){
    this.router.navigate([this.proximo]);
  }

  navigationVoltar(){
    this.router.navigate([this.voltar]);
  }

}
