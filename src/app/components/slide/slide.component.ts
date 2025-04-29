import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente depreciado, era responsavel por ser o slide do texto de apoio. É um componente reutilizavel
 */
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class SlideComponent implements OnInit {
  @Input() caminhoSlide!: any;
  constructor(
    private sanitizer: DomSanitizer,
    public moduloService: ModuloService,
    public ltiService: ServiceAppService
  ) {}
  teste: any;

  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.caminhoSlide =
      this.ltiService.dados_completos.topicos?.[
        this.moduloService.controll_topico
      ]?.textoApoio;

    this.teste =
      `<div style="
    display:flex;
    flex-direction:collumn;
    justify-content:center;
    position: relative;
    width: 100%;

    height: 100%">
     <iframe loading="lazy" style="width: 100%; height: 100%; border: none; padding: 0;margin: 0;"
       src=` +
      this.caminhoSlide +
      ` allow="fullscreen">
     </iframe>
   </div>
   `;
   this.teste = this.sanitizer.bypassSecurityTrustHtml(this.teste);
  }
}
