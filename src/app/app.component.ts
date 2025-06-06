import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { ServiceAppService } from './service-app.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  constructor(
    private themeService: ThemeService,
    private ltiService: ServiceAppService
  ) {}
  ngOnInit(): void {
    this.ltiService.getDadosCompletos();
    this.themeService.limparTemaSalvo();

    const tema = this.ltiService.dados_completos.plataforma.temaTipo
    const cores = {
      primaria: `${this.ltiService.dados_completos.plataforma.customPrimaria}`,
      secundaria: `${this.ltiService.dados_completos.plataforma.customSecundaria}`,
      terciaria: `${this.ltiService.dados_completos.plataforma.customTerciaria}`,
      quartenaria: `${this.ltiService.dados_completos.plataforma.customQuartenaria}`,
      quintenaria: `${this.ltiService.dados_completos.plataforma.customQuintenaria}`,
    }

    this.themeService.aplicarTema(tema, cores);
  }
}
