import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente reutilizavel Saiba Mais, o qual deve, geralmente, ser chamado nas paginas gerais de vizualização dos vídeos, ficará no menu
 */
@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css'],
})
export class SaibaMaisComponent implements OnInit {
  constructor(
    public moduloService: ModuloService,
    public ltiService: ServiceAppService
  ) {}

  /**
   * Variavel que receberá os links que serão inseridos pelo usuário
   */
  @Input() links!: any[];

  /**
   * Variavel faz a interligação entre os eventos
   */
  @Output() linksClick = new EventEmitter<void>();
  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.links =
      this.ltiService.dados_completos.topicos?.[
        this.moduloService.controll_topico
      ]?.SaibaMais;
  }
}
