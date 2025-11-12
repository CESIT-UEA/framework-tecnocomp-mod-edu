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
import { Topico } from 'src/app/interfaces/topico';
import { Subject, takeUntil } from 'rxjs';

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

  private destroy$ = new Subject<void>()

  constructor(
    public moduloService: ModuloService,
    public ltiService: ServiceAppService,
    public downloadService: DownloadPlataformaService,
    public topicoService: TopicoService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.topicoService.inicializarTopico().subscribe({
      next: () => {
        const infoTopicos = localStorage.getItem('infoTopicos');
      if (infoTopicos) {
        this.topicoService.setInfoTopicos(JSON.parse(infoTopicos));
      }

        this.topicoService.getDadosUserTopicoLocalStorage()
        this.carregaVideosUrl()
        this.ltiService.loadYouTubeAPI();
        this.downloadService.initEventInstall()
      }
    })
  }
    

  carregaVideosUrl(){
    const dados_videos = localStorage.getItem('videosUrl')
    if (dados_videos){
      this.carregaVideosUrlStorage()
      console.log('requisição pro local storage videos')
    } else {
      this.videoService.getVideosUrlByModuloId(
      this.moduloService.dados_modulo?.modulo?.id, 
      this.moduloService.dados_modulo?.user?.ltik
    ).subscribe(dados => {
      localStorage.setItem('videosUrl', JSON.stringify(dados))
      this.videoService.dados_video = dados
      console.log('requisição pro back videos')
    })
    }
    
  }


  carregaInfoModuloAndUserTopicos(){
    this.moduloService.dados_modulo = JSON.parse(localStorage.getItem('dados_modulo')!)
    this.topicoService.dados_topico = JSON.parse(localStorage.getItem('userTopico')!)
  }


  carregaVideosUrlStorage(){
    this.videoService.dados_video = JSON.parse(localStorage.getItem('videosUrl')!)
  }
  
  atividadeClick() {
    this.controllerSwitch =
      this.controllerSwitch == 'default' ? '1' : 'default';
  }

  // referenciasClick() {
  //   this.controllerSwitch =
  //     this.controllerSwitch == 'default' ? '3' : 'default';

  //   if (this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.isReferencias == false
  //   ) {
  //     this.ltiService.enviarVistoReferencias().subscribe({
  //       next: (userTopico) => {
  //         this.topicoService.setDadosTopico(userTopico)
  //         this.carregaInfoModuloAndUserTopicos()
  //       }
  //     });
  //   }
  // }

  // linksClick() {
  //   this.controllerSwitch =
  //     this.controllerSwitch == 'default' ? '2' : 'default';
  //   if (this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.isSaibaMais == false) {
  //     this.ltiService.enviarVistoSaibaMais().subscribe({
  //       next: (userTopico) => {
  //         this.topicoService.setDadosTopico(userTopico)
  //         this.carregaInfoModuloAndUserTopicos()
  //       }
  //     })
  //   }
  // }

  // textoApoioClick() {
  //   this.controllerSwitch =
  //     this.controllerSwitch == 'default' ? '4' : 'default';

  //   if (
  //     this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].isTextoApoio == false
  //   ) {
  //     this.ltiService.enviarVistoTextoApoio().subscribe({
  //       next: (userTopico) => {
  //         this.topicoService.setDadosTopico(userTopico)
  //         this.carregaInfoModuloAndUserTopicos()
  //       }
  //     })
  //   }
  // }
  

  fecharMenuClick() {
    this.sidenavContainer.close();
  }

  navegarModulo(topicoId: number) {
    this.moduloService.controll_topico = topicoId;
    this.sidenavContainer.close();
    const indice_video = this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.indice_video

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
