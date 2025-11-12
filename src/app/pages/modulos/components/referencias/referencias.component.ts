import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Referencias } from 'src/app/interfaces/referencias';
import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { ReferenciasService } from 'src/app/personalizavel/referencias.service';
import { TopicoService } from 'src/app/personalizavel/topico.service';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit{
  referencias: Referencias[] = [];

  constructor(
    private topicoService: TopicoService,
    private moduloService: ModuloService,
    private ltiService: ServiceAppService,
    private referenciasService: ReferenciasService
  ){}

  ngOnInit(): void {
    this.atualizarDados()
        
    const ltik = this.moduloService.dados_modulo.user.ltik
    
    const dados_referencias = localStorage.getItem('referencias');
    if (dados_referencias){
      this.referencias = this.referenciasService.getReferenciasLocalStorage()
          
    } else {
      console.log('caiu aqui')
      this.referenciasService.getReferencias(ltik).subscribe({
        next: (dados: Referencias[]) => {
        this.referencias = dados
        this.referenciasService.setReferenciasLocalStorage(dados)
      }
    })
    }
    this.enviarVisto()
  }    
  

  enviarVisto(){
     if (this.topicoService.dados_topico?.[this.moduloService.controll_topico]?.UsuarioTopicos[0]?.isReferencias == false
    ) {
      this.ltiService.enviarVistoReferencias().subscribe({
        next: (userTopico) => {
          this.topicoService.setDadosTopico(userTopico)
          this.atualizarDados()
        }
      });
    }
  }

  atualizarDados(){
    this.moduloService.getDadosModuloStorage()
    this.topicoService.getDadosTopicosStorage()
  }

}
