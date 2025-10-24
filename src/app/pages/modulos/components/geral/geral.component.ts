import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AprendizagemEInformaticaService } from '../../aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { Router } from '@angular/router';
import { ServiceAppService } from 'src/app/service-app.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { Topico } from 'src/app/interfaces/topico';
import { VideoUrl } from 'src/app/interfaces/video-url';
import { VideoService } from 'src/app/personalizavel/video.service';

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
    public topicoService: TopicoService,
    public videoService: VideoService
  ) {}
  @Input() nome!: string;
  @Input() videos!: VideoUrl[];
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

    this.carregaVideosUrl()
    this.videos = this.videoService.dados_video[this.moduloService.controll_topico].VideoUrls
  }

  carregaVideosUrl(){
    this.videoService.dados_video = JSON.parse(localStorage.getItem('videosUrl')!)
  }


  navigation() {
    this.router.navigate([this.proximo]);
  }

  navigationVoltar() {
    this.router.navigate([this.voltar]);
  }
  clicarVideos() {
    console.log(this.videos.length);
    this.ltiService.mensagem("Assista todos os vídeos para poder fazer a atividade! ");
  }
}
