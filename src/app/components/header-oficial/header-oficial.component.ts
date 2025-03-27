import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-header-oficial',
  templateUrl: './header-oficial.component.html',
  styleUrls: ['./header-oficial.component.css']
})
export class HeaderOficialComponent {
  /**
   * Variavel que guarda o nome
   */
  nome: string = '';
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  @Input() urlVideoInicial: any;
  /**
   * @constructor
   * Um método feito para testar caso seja clicado
   */
  constructor(
    public appService: ServiceAppService,
    public moduloService: ModuloService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public downloadService: DownloadPlataformaService
  ) {}

  /**
   * Variavel que guarda o tokenData, o qual é a variavel que guarda as informações do token do usuario, obtidas ao entrar pela primeira vez vindo do moodle
   */
  tokenData: any;

  ngOnInit(): void {
    const ltik = this.route.snapshot.queryParamMap.get('ltik');
    if (ltik) {
      this.moduloService.getUserInfo(ltik).subscribe(
        (data) => {
          this.tokenData = data;
          console.log(data);

          this.moduloService.urlInicio =
            this.tokenData.modulo.nome_modulo + 'Home';

            localStorage.setItem(
            'bloqueio',
            JSON.stringify(this.tokenData.userTopico)
          );

          this.appService.setDadosCompletos(data);


          let teste2 = localStorage.getItem('token');
          if (teste2) {
            localStorage.removeItem('token')
          }

          localStorage.setItem('token', this.tokenData.user.ltik);

          localStorage.setItem('url_retorno', this.tokenData.user.return_url);
          localStorage.setItem(
            'topicos',
            JSON.stringify(this.tokenData.topicos)
          );

          let bloqueio = localStorage.getItem('bloqueio');
          this.moduloService.topicos = this.tokenData.topicos;

          this.moduloService.bloqueio = bloqueio
            ? JSON.parse(bloqueio)
            : this.tokenData.userTopico;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

    this.appService.getDadosCompletos();
  }

  /**
   * @method
   */
  navigation() {
    this.router.navigate(['/teorias-da-aprendizagem']);
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
    if (this.appService.dados_completos.userTopico[this.moduloService.controll_topico].UsuarioTopicos[0].indice_video != null) {
      this.appService.currentVideoIndex = this.appService.dados_completos.userTopico[this.moduloService.controll_topico].UsuarioTopicos[0].indice_video
      console.log("Video retornado salvo já")
    }else{
      this.appService.currentVideoIndex = 0
    }
    this.appService.recreatePlayer()
  }
}
