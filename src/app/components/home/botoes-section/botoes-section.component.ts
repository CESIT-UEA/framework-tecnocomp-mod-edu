import { Component, Input, Output, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InfoTopico } from 'src/app/interfaces/info-topico';
import { Topico } from 'src/app/interfaces/topico';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { VideoService } from 'src/app/personalizavel/video.service';
import { ServiceAppService } from 'src/app/service-app.service';
import { Subscription } from 'rxjs';

/**
 * Componente dos botões que ficam na pagina inicial do modulo
 */
@Component({
  selector: 'app-botoes-section',
  templateUrl: './botoes-section.component.html',
  styleUrls: ['./botoes-section.component.css'],
})
export class BotoesSectionComponent implements OnInit, OnDestroy{
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

  infoTopicos: InfoTopico[] = [];
  carregandoBotao: boolean = true;
  verificaCompleto: boolean | null = null;
  private subscriptions = new Subscription();

  /**
   * @method
   * Constructor do componente de Botões, que utiliza o Router
   */
  constructor(
    public topicoService: TopicoService, 
    public moduloService: ModuloService, 
    private appService: ServiceAppService
  ) {}

  ngOnInit(): void {
    const sub = this.topicoService.infoTopicos$.subscribe(data => {
    if (data?.length) {
      this.infoTopicos = data;
      this.verificaCompleto = this.getVerificaCompleto();
      this.carregandoBotao = false;
    }
    });
    this.subscriptions.add(sub)
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
  }

  getVerificaCompleto() {
    if (this.infoTopicos.length === 0) return null
    console.log("Passei do null")
    return this.infoTopicos.every(t => t.encerrado[0])
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

   

}
