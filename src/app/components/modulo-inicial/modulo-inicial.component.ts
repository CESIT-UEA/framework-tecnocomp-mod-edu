import { Component, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-modulo-inicial',
  templateUrl: './modulo-inicial.component.html',
  styleUrls: ['./modulo-inicial.component.css']
})
export class ModuloInicialComponent implements OnInit{
  constructor(
    public moduloService: ModuloService,
    private apiService: ServiceAppService,
    public topicoService: TopicoService
  ){}

  ngOnInit(): void {
      this.apiService.controllerSwitchHome = 0
  }
}
