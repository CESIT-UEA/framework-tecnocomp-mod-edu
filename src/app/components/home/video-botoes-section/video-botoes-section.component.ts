import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadPlataformaService } from 'src/app/download-plataforma.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-video-botoes-section',
  templateUrl: './video-botoes-section.component.html',
  styleUrls: ['./video-botoes-section.component.css'],
})
export class VideoBotoesSectionComponent {
  constructor(
    public appService: ServiceAppService,
    public moduloService: ModuloService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public downloadService: DownloadPlataformaService
  ) {}
}
