import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente depreciado, era responsavel por ser o slide do texto de apoio. É um componente reutilizavel
 */
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
})
export class  SlideComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private moduloService: ModuloService, 
    private topicoService: TopicoService,
    private ltiService: ServiceAppService,
  ) {}
  teste:any;
  
  ngOnInit(): void {
 
    this.atualizarDados()
    this.enviarVisto()

    this.teste = `<div style="
    display:flex;
    flex-direction:collumn;
    justify-content:center;
    position: relative;
    width: 100%;

    height: 100%">
     <iframe loading="lazy" style="width: 100%; height: 100%; border: none; padding: 0;margin: 0;"
       src=`+ this.caminhoSlide + ` allow="fullscreen">
     </iframe>
   </div>
   `;
    this.teste = this.sanitizer.bypassSecurityTrustHtml(this.teste);
  }

  get caminhoSlide(){
    return this.topicoService.dados_topico[this.moduloService.controll_topico].textoApoio
  }

  enviarVisto(){
      if (
      this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].isTextoApoio == false
    ) {
      this.ltiService.enviarVistoTextoApoio().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.atualizarDados()
        }
      })
    }
  }

  atualizarDados(){
    this.moduloService.getDadosModuloStorage()
    this.topicoService.getDadosTopicosStorage()
  }
}
