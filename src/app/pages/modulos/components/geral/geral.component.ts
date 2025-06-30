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
      'Assista todos os vídeos para poder fazer a atividade! '
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

  verificaProximo() {
    let topicos: any[] = this.ltiService.dados_completos.topicos;

    if (
      this.moduloService.controll_topico >= 0 &&
      this.moduloService.controll_topico < topicos.length - 1
    ) {
      return true;
    }

    return false;
  }

  proximo(): void {
    this.ltiService.currentVideoIndex = 0;
    if (
      this.moduloService.controll_topico <
      this.ltiService.dados_completos.topicos.length - 1
    ) {
      if (
        this.ltiService.dados_completos.userTopico[
          this.moduloService.controll_topico
        ]?.UsuarioTopicos[0].encerrado
      ) {
        this.moduloService.controll_topico += 1;
      } else {
        this.ltiService.mensagem('Você precisa responder à atividade antes!');
      }
    }

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
    }

    this.ltiService.recreatePlayer();
  }

  voltar(): void {
    if (this.moduloService.controll_topico > 0) {
      this.moduloService.controll_topico -= 1;
      this.ltiService.currentVideoIndex = 0;
    }

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
    }
    this.ltiService.recreatePlayer();
  }
}
