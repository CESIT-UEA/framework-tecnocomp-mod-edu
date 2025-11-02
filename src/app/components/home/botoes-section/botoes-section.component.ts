import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InfoTopico } from 'src/app/interfaces/info-topico';
import { Topico } from 'src/app/interfaces/topico';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { VideoService } from 'src/app/personalizavel/video.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente dos botões que ficam na pagina inicial do modulo
 */
@Component({
  selector: 'app-botoes-section',
  templateUrl: './botoes-section.component.html',
  styleUrls: ['./botoes-section.component.css'],
})
export class BotoesSectionComponent {
  /**
   * Variáveis filha que guarda a url da unidade inicial do modulo
   */
  @Input() urlInicio!: string;

  /**
   * Variavel que guarda o nome do ebook
   */
  @Input() nome_ebook!: string;

  /**
   * Variavel que guarda o caminho para o donwoload do ebook
   */
  @Input() caminho_ebook!: string;

  carregandoBotao: boolean = true;
  infoTopicos: InfoTopico[] = [];

  /**
   * @method
   * Constructor do componente de Botões, que utiliza o Router
   */
  constructor(
    public topicoService: TopicoService, 
    public moduloService: ModuloService, 
    private appService: ServiceAppService,
    private videoService: VideoService
  ) {}

  getVerificaCompleto() {
    const topicosInfo = localStorage.getItem('infoTopicos');
    
    if (topicosInfo) this.infoTopicos = JSON.parse(topicosInfo);
    if (this.infoTopicos.length === 0) return null

    for (let topico of this.infoTopicos){
      if (!topico.encerrado[0]){
        this.carregandoBotao = false
        return false;  // Retorna falso assim que encontrar um "encerrado" diferente de true
      }
      } 
    this.carregandoBotao = false
    return true // Retorna verdadeiro se todos os itens passarem na verificação
  }

  getDadosUserInfo(){
    let ltik = localStorage.getItem('token');
    if (ltik){
      this.moduloService.getUserInfo(JSON.parse(ltik)).subscribe(
         (data) => {
           this.appService.setDadosCompletos(data);
         },
         (error) => {
           console.error('Error:', error);
         }
       );
    }
  }

   carregaVideosUrl(){
    this.videoService.getVideosUrlByModuloId(
      this.moduloService.dados_modulo.modulo.id, 
      this.moduloService.dados_modulo.user.ltik
    ).subscribe(dados => {
      localStorage.setItem('videosUrl', JSON.stringify(dados))
      this.videoService.dados_video = dados
    })
  }

}
