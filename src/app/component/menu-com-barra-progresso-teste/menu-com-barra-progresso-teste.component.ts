import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Topico } from 'src/app/interfaces/topico';
import { AprendizagemEInformaticaService } from 'src/app/pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente que contem a barra de progresso
 */
@Component({
  selector: 'app-menu-com-barra-progresso-teste',
  templateUrl: './menu-com-barra-progresso-teste.component.html',
  styleUrls: ['./menu-com-barra-progresso-teste.component.css'],
})
export class MenuComBarraProgressoTesteComponent implements OnInit {
  teste: any;
  /**
   * @constructor
   */

  @Output() fecharMenu = new EventEmitter<void>();

  @Output() navegarModulo = new EventEmitter<number>();

  @Input() verificaMenuHome = false;
  ola(i: number) {
    console.log(i);
    console.log(this.verificarConcluido(i))
  }
  constructor(
    /**
     * Variavel que instancia o service AprendizagemEmInformaticaService
     */
    public aprendizagemInformatica: AprendizagemEInformaticaService,

    /**
     * Variavel que instancia o service ServiceAppService, que contém as configurações LTI
     */
    public ltiService: ServiceAppService,
    public moduloService: ModuloService,
    public topicoService: TopicoService
  ) {}

  ngOnInit(): void {}

  verificarConcluido(i: number) {
    if (
      this.topicoService.dados_topico[i].UsuarioTopicos[0].encerrado
    ) {
      return true;
    }

    if (
      this.topicoService.dados_topico[i - 1].UsuarioTopicos[0].encerrado == true &&
      this.topicoService.dados_topico[i].UsuarioTopicos[0].encerrado == false && i != 0
    ) {
      return true;
    }

    if (this.topicoService.dados_topico[i].UsuarioTopicos[0].encerrado && i == 0) {
      return true
    }

    return false;
  }

  getQuantidadeTopicosConcluidos() {
    let cont = 0;
    
    this.topicoService.dados_topico.map((topico: Topico) => {
      if (topico.UsuarioTopicos[0].encerrado == true) {
        cont += 1;
      }
    })

    return cont;
  }

  getDadosUserInfo(){
    let ltik = localStorage.getItem('token');
    if (ltik){
      this.moduloService.getUserInfo(JSON.parse(ltik)).subscribe(
         (data) => {
           this.ltiService.setDadosCompletos(data);
         },
         (error) => {
           console.error('Error:', error);
         }
       );
    }
  }
}
