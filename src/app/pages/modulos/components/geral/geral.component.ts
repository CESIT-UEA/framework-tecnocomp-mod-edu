import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AprendizagemEInformaticaService } from '../../aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { Router } from '@angular/router';
import { ServiceAppService } from 'src/app/service-app.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css'],
})
export class GeralComponent implements OnInit {
  constructor(
    public aprendizagemInformatica: AprendizagemEInformaticaService,
    private router: Router,
    public ltiService: ServiceAppService,
    public moduloService: ModuloService,

  ) {}
  @Input() nome!: string;
  @Input() videos!: string[];
  @Output() referenciasClick = new EventEmitter<void>();
  @Output() linksClick = new EventEmitter<void>();
  @Output() textoApoioClick = new EventEmitter<void>();
  @Output() atividadeClick = new EventEmitter<void>();

  @Input() link: number = 0;
  @Input() voltar!: string;
  @Input() proximo!: string;
  @Input() liberado: boolean = false;

  ngOnInit(): void {
    if (this.ltiService.controlAtividade >= this.videos.length) {
      this.ltiService.controlAtividade = 1;
    }
    console.log(this.ltiService.dados_completos.userTopico[
      this.moduloService.controll_topico
    ].UsuarioTopicos[0].resposta_errada);

  }
  navigation() {
    this.router.navigate([this.proximo]);
  }

  navigationVoltar() {
    this.router.navigate([this.voltar]);
  }
  clicarVideos() {
    console.log(this.videos.length);
    this.ltiService.mensagem("Assista todos os videos para poder fazer a atividade! ");
  }
}
