import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-slide-unidade',
  templateUrl: './slide-unidade.component.html',
  styleUrls: ['./slide-unidade.component.css'],
})
export class SlideUnidadeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) videos!: any[];
  isLoading = false;

  constructor(
    public ltiService: ServiceAppService,
    public moduloService: ModuloService,
    public topicoService: TopicoService
  ) {}

  ngOnInit(): void {
    const indice_video = this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].indice_video
    if (indice_video != null) {
      this.ltiService.currentVideoIndex = indice_video
    }
    this.ltiService.loadYouTubeAPI();
  }

  ngAfterViewInit(): void {
    this.ltiService.recreatePlayer();
  }

  ngOnDestroy(): void {
    if (this.ltiService.player) {
      this.ltiService.player.destroy();
      this.ltiService.player = null;
    }
  }

  // Retorna os vídeos visíveis na página atual
  get arrayVisivel() {
    return this.videos;
  }

  selectVideo(index: number): void {
    this.startLoading();
    this.ltiService.currentVideoIndex = index;
    this.ltiService.salvarProgressoVideos().subscribe((response) => {
      this.ltiService.removeDadosCompletos();
      this.ltiService.setDadosCompletos(response);
    });
    this.ltiService.recreatePlayer();
    this.stopLoading();
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    this.isLoading = false;
  }

  getVerificaVideosAssistidos(): number {
    return this.videos.filter((video) => video.UsuarioVideos[0].completo).length;
  }

}
