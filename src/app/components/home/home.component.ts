import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';
import { DadosModulo } from 'src/app/interfaces/info-modulo';
import { InfoTopico } from 'src/app/interfaces/info-topico';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente reutilizavel da Home de cada módulo
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /**
   * Variavel que guarda o nome
   */
  nome: string = '';
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  @Input() urlVideoInicial: any;

  renderizarMenuNavegacao: boolean = false;
  
  infoTopicos: InfoTopico[] = [];
  infoTopicoCarregada: boolean = false;

  /**
   * @constructor
   * Um método feito para testar caso seja clicado
   */
  constructor(
    public appService: ServiceAppService,
    public moduloService: ModuloService,
    private route: ActivatedRoute,
    public downloadService: DownloadPlataformaService,
    public topicoService: TopicoService
  ) {}

  /**
   * Variavel que guarda o tokenData, o qual é a variavel que guarda as informações do token do usuario, obtidas ao entrar pela primeira vez vindo do moodle
   */
  tokenData: any;

  ngOnInit(): void {
    const ltik = this.route.snapshot.queryParamMap.get('ltik');
    let token = localStorage.getItem('token')
    if (token){
      token = JSON.parse(token) as string
    }
    if (ltik && ltik !== token) {
      this.topicoService.limparCacheTopico()
      console.log('Requisição para o back')
      this.getModuloInfo(ltik)
      
    } else {
      console.log('Requisição para o storage')
      const token = JSON.parse(localStorage.getItem('token') as string)
      if (token){
        this.moduloService.getDadosModuloStorage();
        this.topicoService.getDadosInfoTopicosStorage()
        this.topicoService.setInfoTopicos(this.topicoService.info_topicos)
      }
    }
  }

  getModuloInfo(ltik: string){
    if (ltik){
      this.moduloService.getModuloInfo(ltik).subscribe({
      next: (data: DadosModulo) => {
        this.moduloService.setDadosModulo(data);
        const token = data.user.ltik
        localStorage.setItem('token', JSON.stringify(token))

        // controle de requisição
        // localStorage.setItem(`control_req_${ltik}`, '1');

        this.moduloService.getDadosModuloStorage()
  
        // infoTopicos
        this.topicoService.getInfoTopicos(
        this.moduloService.dados_modulo.modulo.id,
        this.moduloService.dados_modulo.user.id_aluno,
        this.moduloService.dados_modulo.user.ltik
    ).subscribe({
      next: (infoTopicos: InfoTopico[]) => {
        this.topicoService.setInfoTopicos(infoTopicos)
      }
    })
      },
      error: (err) => {
        console.error("Erro ao buscar dados do módulo", err);
      }
    });
    }
  }


  clickHeader(controller: number) {
    return (this.appService.controllerSwitchHome = controller)
  }

  fecharMenuClick() {
    this.sidenavContainer.close();
  }

  navegarModulo(topicoId:number){
    console.log(topicoId)
    this.moduloService.controll_topico = topicoId
    this.sidenavContainer.close();

    const indice_video = this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.indice_video

    // video retorna salvo
    if (indice_video != null) {
      this.appService.currentVideoIndex = indice_video
    }else{
      this.appService.currentVideoIndex = 0
    }
    this.appService.recreatePlayer()
  }
}
