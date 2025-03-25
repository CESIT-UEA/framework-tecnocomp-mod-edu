import { ServiceAppService } from 'src/app/service-app.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuloService } from '../../modulo.service';
import { config } from 'rxjs';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.css'],
})
export class TopicoComponent implements OnInit {
  nomeModulo: string = '';
  nomeTopico!: string;
  teste: any;
  controllerSwitch = 'default'; // Inicialmente exibe o componente default
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;
  menu = false;

  constructor(
    private route: ActivatedRoute,
    public moduloService: ModuloService,
    private router: Router,
    public ltiService: ServiceAppService,
    public downloadService: DownloadPlataformaService
  ) {}

  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.ltiService.loadYouTubeAPI();
    this.downloadService.initEventInstall()
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
  voltarCss() {
    if (this.moduloService.controll_topico == 0) {
      return 'display:none';
    }

    return;
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

  atividadeClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '1' : 'default';
  }

  referenciasClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '3' : 'default';

    if (
      this.ltiService.dados_completos.userTopico[
        this.moduloService.controll_topico
      ].UsuarioTopicos[0].isReferencias == false
    ) {
      this.ltiService.enviarVistoReferencias().subscribe(
        (response) => {
          this.ltiService.removeDadosCompletos();
          this.ltiService.setDadosCompletos(response);
          this.ltiService.loadYouTubeAPI();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    console.log("Fechei referencias")

  }

  linksClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '2' : 'default';
    if (
      this.ltiService.dados_completos.userTopico[
        this.moduloService.controll_topico
      ].UsuarioTopicos[0].isSaibaMais == false
    ) {
      this.ltiService.enviarVistoSaibaMais().subscribe(
        (response) => {
          this.ltiService.removeDadosCompletos();
          this.ltiService.setDadosCompletos(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    console.log("Fechei links")
  }

  textoApoioClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '4' : 'default';

    if (
      this.ltiService.dados_completos.userTopico[
        this.moduloService.controll_topico
      ].UsuarioTopicos[0].isTextoApoio == false
    ) {
      this.ltiService.enviarVistoTextoApoio().subscribe(
        (response) => {
          this.ltiService.removeDadosCompletos();
          this.ltiService.setDadosCompletos(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    console.log("Fechei texto apoio")
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
  resetaHome(){
    this.ltiService.controllerSwitchHome = 0;
  }

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
  verificaVoltar() {
    let topicos: any[] = this.ltiService.dados_completos.topicos;

    if (
      this.moduloService.controll_topico > 0 &&
      this.moduloService.controll_topico <= topicos.length
    ) {
      return true;
    }

    return false;
  }
}
