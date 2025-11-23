import { Component, OnInit } from '@angular/core';
import { InfoTopico } from 'src/app/interfaces/info-topico';
import { Topico } from 'src/app/interfaces/topico';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';


@Component({
  selector: 'app-links-navegacao-topicos',
  templateUrl: './links-navegacao-topicos.component.html',
  styleUrls: ['./links-navegacao-topicos.component.css']
})
export class LinksNavegacaoTopicosComponent implements OnInit {
    constructor(
      public moduloService: ModuloService,
      public ltiService: ServiceAppService,
      public topicoService: TopicoService
    ){}

    ngOnInit(): void {
      this.topicoService.dadosTopico$.subscribe(data => {
      if (data){
        this.topicoService.dados_topico = data
      }
    })
    }

    
    verificaProximo() {
      let topicos: Topico[] = this.topicoService.dados_topico;
      let infoTopicos: InfoTopico[] = this.topicoService.info_topicos;
      if (
        this.moduloService.controll_topico >= 0 &&
        this.moduloService.controll_topico < infoTopicos?.length - 1
      ) {
        return true;
      }

      return false;
  }
  verificaVoltar() {
    let topicos: Topico[] = this.topicoService.dados_topico;
    let infoTopicos: InfoTopico[] = this.topicoService.info_topicos;

    if (
      this.moduloService.controll_topico > 0 &&
      this.moduloService.controll_topico <= infoTopicos?.length
    ) {
      return true;
    }

    return false;
  }

  proximo(): void {
    this.ltiService.currentVideoIndex = 0;
    if (
      this.moduloService.controll_topico < this.topicoService.info_topicos?.length - 1
    ) {
      if (
        this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.encerrado
      ) {
        this.moduloService.controll_topico += 1;
      } else {
        this.ltiService.mensagem('Você precisa responder à atividade antes!');
      }
    }

    const indice_video = this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.indice_video

    if (indice_video != null) {
      this.ltiService.currentVideoIndex = indice_video
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

    const indice_video = this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.indice_video

    if (indice_video != null) {
      this.ltiService.currentVideoIndex = indice_video
      console.log('Video retornado salvo já');
    }
    this.ltiService.recreatePlayer();
  }

}
