import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AprendizagemEInformaticaService } from '../../aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { Router } from '@angular/router';
import { ServiceAppService } from 'src/app/service-app.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css'],
})
export class GeralComponent implements OnInit {
  constructor(
    private router: Router,
    public ltiService: ServiceAppService,
    public moduloService: ModuloService
  ) {}
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;
  showFiller = false;
  @Input() nome!: string;
  @Input() videos!: string[];
  @Output() referenciasClick = new EventEmitter<void>();
  @Output() linksClick = new EventEmitter<void>();
  @Output() textoApoioClick = new EventEmitter<void>();
  @Output() atividadeClick = new EventEmitter<void>();
  @Output() subMenuClick = new EventEmitter<void>();

  @Input() link: number = 0;
  @Input() voltar!: string;
  @Input() proximo!: string;
  @Input() liberado: boolean = false;

  ngOnInit(): void {
    if (this.ltiService.controlAtividade >= this.videos.length) {
      this.ltiService.controlAtividade = 1;
    }
    console.log(
      this.ltiService.dados_completos.userTopico[
        this.moduloService.controll_topico
      ].UsuarioTopicos[0].resposta_errada
    );
  }
  navigation() {
    this.router.navigate([this.proximo]);
  }

  navigationVoltar() {
    this.router.navigate([this.voltar]);
  }
  clicarVideos() {
    console.log(this.videos.length);
    this.ltiService.mensagem(
      'Assista todos os videos para poder fazer a atividade! '
    );
  }
  fecharMenuClick() {
    this.sidenavContainer.close();
  }

  navegarModulo(topicoId: number) {
    console.log(topicoId);
    this.moduloService.controll_topico = topicoId;
    this.sidenavContainer.close();
    if (
      this.ltiService.dados_completos.userTopico[
        this.moduloService.controll_topico
      ].UsuarioTopicos[0].indice_video != null
    ) {
      this.ltiService.currentVideoIndex =
        this.ltiService.dados_completos.userTopico[
          this.moduloService.controll_topico
        ].UsuarioTopicos[0].indice_video;
      console.log('Video retornado salvo já');
    } else {
      this.ltiService.currentVideoIndex = 0;
    }
    this.ltiService.recreatePlayer()
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuAberto = false;
  @Output() abrirMenu = new EventEmitter<void>();



}
