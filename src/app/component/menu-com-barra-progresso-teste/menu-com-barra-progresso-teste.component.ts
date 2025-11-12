import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoTopico } from 'src/app/interfaces/info-topico';
import { Topico } from 'src/app/interfaces/topico';
import { AprendizagemEInformaticaService } from 'src/app/pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';
import { Subscription } from 'rxjs';
import { Subject, takeUntil } from 'rxjs';


/**
 * Componente que contem a barra de progresso
 */
@Component({
  selector: 'app-menu-com-barra-progresso-teste',
  templateUrl: './menu-com-barra-progresso-teste.component.html',
  styleUrls: ['./menu-com-barra-progresso-teste.component.css'],
})
export class MenuComBarraProgressoTesteComponent implements OnInit, OnDestroy {
  teste: any;
  /**
   * @constructor
   */

  infoTopicos: InfoTopico[] = []; 
  
  subscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

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
    public topicoService: TopicoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.topicoService.dadosTopico$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data){
        this.topicoService.dados_topico = data
      }
    })

    this.topicoService.infoTopicos$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data){
        this.infoTopicos = data
        this.topicoService.info_topicos = data
        console.log('teste')
      }
    })

    // this.subscription.add(sub)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete()
  }

  verificarConcluido(i: number){
    const topico = this.infoTopicos[i];
    const anterior = this.infoTopicos[i - 1];

    const encerradoAtual = topico?.encerrado?.[0] ?? false;
    const encerradoAnterior = anterior?.encerrado?.[0] ?? false;

    if (encerradoAtual) return true;
    if (!encerradoAtual && encerradoAnterior && i !== 0) return true;
    if (!encerradoAtual && i === 0) return true

    return false
  }

  getQuantidadeTopicosConcluidos() {
    let cont = 0;

    this.infoTopicos.map((topico: InfoTopico) => {
      if (topico.encerrado[0] === true){
        cont += 1
      }
    })

    return cont;
  }

  // getDadosUserInfo(){
  //   let ltik = localStorage.getItem('token');
  //   if (ltik){
  //     this.moduloService.getUserInfo(JSON.parse(ltik)).subscribe(
  //        (data) => {
  //          this.ltiService.setDadosCompletos(data);
  //        },
  //        (error) => {
  //          console.error('Error:', error);
  //        }
  //      );
  //   }
  // }
}
