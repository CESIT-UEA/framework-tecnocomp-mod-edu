import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SaibaMais } from 'src/app/interfaces/saiba-mais';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { SaibaMaisService } from 'src/app/personalizavel/saiba-mais.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

/**
 * Componente reutilizavel Saiba Mais, o qual deve, geralmente, ser chamado nas paginas gerais de vizualização dos vídeos, ficará no menu
 */
@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css'],
})


export class SaibaMaisComponent implements OnInit{
  /**
   * Variavel que receberá os links que serão inseridos pelo usuário
   */
  links: SaibaMais[] = [];

  constructor(
    private topicoService: TopicoService, 
    private moduloService: ModuloService, 
    private ltiService: ServiceAppService,
    private saibaMaisService: SaibaMaisService
  ){}

  ngOnInit(): void {
    this.atualizarDados()
    
    const ltik = this.moduloService.dados_modulo.user.ltik
    const id_topico = this.topicoService.dados_topico[this.moduloService.controll_topico].id

    const dados_saiba_mais = localStorage.getItem('saiba_mais');
    if (dados_saiba_mais){
      this.links = this.saibaMaisService.getSaibaMaisLocalStorage()
      
    } else {
      console.log('caiu aqui')
      this.saibaMaisService.getSaibaMais(ltik, id_topico).subscribe({
      next: (dados: SaibaMais[]) => {
        this.links = dados
        this.saibaMaisService.setSaibaMaisLocalStorage(dados)
      }
      })
    }
    this.enviarVisto()
  }


   enviarVisto() {
    if (this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.isSaibaMais == false) {
      this.ltiService.enviarVistoSaibaMais().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.atualizarDados()
        }
      })
    }
  }

  atualizarDados(){
    this.moduloService.getDadosModuloStorage()
    this.topicoService.getDadosTopicosStorage()
  }
}
