import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente do Header de pagina inicial do Modulo
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  constructor(
    public appService: ServiceAppService,
    public moduloService: ModuloService,
    public topicoService: TopicoService
  ) {}
  ngOnInit(): void {
   
  }

  navegarModulo(topicoId:number){
    console.log(topicoId)
    this.moduloService.controll_topico = topicoId
    this.sidenavContainer.close();

    const indice_video = this.topicoService.dados_topico[this.moduloService.controll_topico].UsuarioTopicos[0].indice_video

    // video retorna salvo
    if (indice_video != null) {
      this.appService.currentVideoIndex = indice_video
    }else{
      this.appService.currentVideoIndex = 0
    }
    this.appService.recreatePlayer()
  }

  fecharMenuClick() {
    this.sidenavContainer.close();
  }

  clickHeader(controller: number) {
    return (this.appService.controllerSwitchHome = controller)
  }
}

  
  
