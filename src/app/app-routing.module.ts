import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AprendizagemEInformaticaComponent } from './pages/modulos/aprendizagem-e-informatica/aprendizagem-e-informatica.component';
import { BehaviorismoComponent } from './pages/modulos/components/behaviorismo/behaviorismo.component';
import { ConstrutivismoComponent } from './pages/modulos/components/construtivismo/construtivismo.component';
import { SocioconstrutivismoComponent } from './pages/modulos/components/socioconstrutivismo/socioconstrutivismo.component';
import { ConstrucionismoComponent } from './pages/modulos/components/construcionismo/construcionismo.component';
import { ForumComponent } from './components/forum/forum.component';
import { TopicoForumComponent } from './components/forum/topico-forum/topico-forum.component';
import { ComentariosComponent } from './components/forum/topico-forum/comentarios/comentarios.component';
import { ErrorComponent } from './components/error/error.component';
import { ModuloComponent } from './personalizavel/modulo/modulo.component';
import { TopicoComponent } from './personalizavel/modulo/topico/topico.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { CadastroAvaComponent } from './components/cadastro-ava/cadastro-ava.component';
import { ModuloConcluidoComponent } from './components/modulo-concluido/modulo-concluido.component';
import { SobreComponent } from './components/home/sobre/sobre.component';
import { FichaTecnicaComponent } from './components/home/ficha-tecnica/ficha-tecnica.component';
import { ReferenciasComponent } from './pages/modulos/components/referencias/referencias.component';
import { SaibaMaisComponent } from './pages/modulos/components/saiba-mais/saiba-mais.component';
import { SlideComponent } from './components/slide/slide.component';
import { AtividadeComponent } from './pages/modulos/components/atividade/atividade.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },

  { path: 'ava/editar/:id', component: CadastroAvaComponent },
  { path: 'ava/adicionar', component: CadastroAvaComponent },

  /*   { path: 'modulo/:nome_modulo', component: ModuloComponent },
  { path: 'modulo/:nome_modulo/topicos', component: TopicoComponent }, */
  { path: 'avaliar', component: ModuloConcluidoComponent },
  /*   { path: 'sobre', component: SobreComponent }, */
  {
    path: 'modulo',
    children: [

      { path: ':nome_modulo', component: ModuloComponent },
      { path: ':nome_modulo/sobre', component: SobreComponent },
      { path: ':nome_modulo/ficha-tecnica', component: FichaTecnicaComponent },
      { path: ':nome_modulo/topicos', component: TopicoComponent },
      { path: ':nome_modulo/topicos/referencias', component: ReferenciasComponent },
      { path: ':nome_modulo/topicos/saiba-mais', component: SaibaMaisComponent },
      { path: ':nome_modulo/topicos/slide', component: SlideComponent },
      { path: ':nome_modulo/topicos/exercicios', component: AtividadeComponent },
      { path: '**', redirectTo: ':nome_modulo' },

    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
