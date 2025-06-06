import { Injectable } from '@angular/core';
import { ServiceAppService } from '../service-app.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {}
  private temasFixos: any = {
    padrao: {
      primaria: '#793cd4',
      secundaria: '#5e17eb',
      terciaria: '#9665df',
      quartenaria: '#c3a1f5',
      quintenaria: '#3c2859',
    },
    tema1: {
      primaria: '#1e88e5',
      secundaria: '#42a5f5',
      terciaria: '#90caf9',
      quartenaria: '#e3f2fd',
      quintenaria: '#0d47a1',
    },
    tema2: {
      primaria: '#388e3c',
      secundaria: '#66bb6a',
      terciaria: '#a5d6a7',
      quartenaria: '#e8f5e9',
      quintenaria: '#1b5e20',
    },
  };

  private readonly LOCAL_STORAGE_KEY = 'tema_aplicado';

  aplicarTema(temaTipo: string, coresCustomizadas?: any): void {
    const tema =
      temaTipo === 'customizado'
        ? coresCustomizadas
        : this.temasFixos[temaTipo] || this.temasFixos['padrao'];

    if (!tema) {
      console.warn('Tema inválido:', temaTipo);
      return;
    }

    document.documentElement.style.setProperty('--primaria', tema.primaria);
    document.documentElement.style.setProperty('--secundaria', tema.secundaria);
    document.documentElement.style.setProperty('--terciaria', tema.terciaria);
    document.documentElement.style.setProperty(
      '--quartenaria',
      tema.quartenaria
    );
    document.documentElement.style.setProperty(
      '--quintenaria',
      tema.quintenaria
    );


    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify({
        temaTipo,
        ...tema,
      })
    );
  }

  aplicarTemaSalvo(): void {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (data) {
      const { temaTipo, ...cores } = JSON.parse(data);
      this.aplicarTema(temaTipo, cores);
    }
  }

  limparTemaSalvo(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
