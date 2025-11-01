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
import { TopicoService } from '../../topico.service';
import { VideoService } from '../../video.service';

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
    public moduloService: ModuloService,
    public ltiService: ServiceAppService,
    public downloadService: DownloadPlataformaService,
    public topicoService: TopicoService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.carregaInfoModuloAndUserTopicos()
    this.carregaVideosUrl()
    this.ltiService.loadYouTubeAPI();
    this.downloadService.initEventInstall()
  }

  carregaInfoModuloAndUserTopicos(){
    this.moduloService.dados_modulo = JSON.parse(localStorage.getItem('dados_modulo')!)
    this.topicoService.dados_topico = JSON.parse(localStorage.getItem('userTopico')!)
  }


  carregaVideosUrl(){
    this.videoService.dados_video = JSON.parse(localStorage.getItem('videosUrl')!)
  }
  
  atividadeClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '1' : 'default';
  }

  referenciasClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '3' : 'default';

    if (this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].isReferencias == false
    ) {
      this.ltiService.enviarVistoReferencias().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.carregaInfoModuloAndUserTopicos()
        }
      });
    }
  }

  linksClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '2' : 'default';
    if (this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].isSaibaMais == false) {
      this.ltiService.enviarVistoSaibaMais().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.carregaInfoModuloAndUserTopicos()
        }
      })
    }
  }

  textoApoioClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '4' : 'default';

    if (
      this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].isTextoApoio == false
    ) {
      this.ltiService.enviarVistoTextoApoio().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.carregaInfoModuloAndUserTopicos()
        }
      })
    }
  }
  

  fecharMenuClick() {
    this.sidenavContainer.close();
  }

  navegarModulo(topicoId: number) {
    this.moduloService.controll_topico = topicoId;
    this.sidenavContainer.close();
    const indice_video = this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].indice_video

    // video retorna salvo
    if (indice_video != null ) {
      this.ltiService.currentVideoIndex = indice_video
    } else {
      this.ltiService.currentVideoIndex = 0;
    }
    this.ltiService.recreatePlayer()
  }
  resetaHome(){
    this.ltiService.controllerSwitchHome = 0;
  }
}
