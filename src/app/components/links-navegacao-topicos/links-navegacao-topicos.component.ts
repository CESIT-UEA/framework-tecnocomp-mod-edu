import { Component } from '@angular/core';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-links-navegacao-topicos',
  templateUrl: './links-navegacao-topicos.component.html',
  styleUrls: ['./links-navegacao-topicos.component.css']
})
export class LinksNavegacaoTopicosComponent {
    constructor(
      public moduloService: ModuloService,
      public ltiService: ServiceAppService
    ){}

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

}
