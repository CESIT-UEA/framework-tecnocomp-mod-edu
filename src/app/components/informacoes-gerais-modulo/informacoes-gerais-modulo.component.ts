import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-informacoes-gerais-modulo',
  templateUrl: './informacoes-gerais-modulo.component.html',
  styleUrls: ['./informacoes-gerais-modulo.component.css']
})
export class InformacoesGeraisModuloComponent implements OnInit{
  constructor(
    public appService: ServiceAppService,
    public moduloService: ModuloService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public downloadService: DownloadPlataformaService
  ) {}
  ngOnInit(): void {
    this.appService.getTopicosFinalizados()
  }
  estrelas = new Array(5).fill(0);

  calcularMedia(){
    /* Colocar a lógica da média de estrelas ou fazer direto no back */
  }

}
