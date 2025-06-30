import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css'],
})
export class ReferenciasComponent implements OnInit {
  @Input() referencias!: any[];
  @Output() referenciasClick = new EventEmitter<void>();
  constructor(
    public moduloService: ModuloService,
    public ltiService: ServiceAppService
  ) {}

  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.referencias =
      this.ltiService.dados_completos.topicos?.[
        this.moduloService.controll_topico
      ]?.Referencias;
  }
}
