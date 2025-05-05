import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceAppService } from 'src/app/service-app.service';
import { ModuloService } from 'src/app/personalizavel/modulo.service';

/**
 * Componente reutilizavel de atividade
 */
@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css'],
})
export class AtividadeComponent implements OnInit, OnChanges {
  teste: any;
  @Input() gradeIn = true;
  @Input() bloqueio: any = false;
  idTopico!: number;
  @Output() atividadeClick = new EventEmitter<void>();
  vetorLetras: string[] = ['A', 'B', 'C', 'D'];
  abre: boolean | null = null;
  respondidoOficialmente: boolean = false;
  caminhoImagem: string = '../../../../../assets/img/Letra ';
  respostaEnviada: boolean = false;
  respostaCorretaEnviada: boolean = false;
  nota: number = 0;
  resposta: string | null = null;
  tokenStorage: any;
  tokenData: any;
  questao: any | null = null;
  quantidadeTopicos: any = [];
  respostaEscolhida: any = null;

  constructor(
    private http: HttpClient,
    public ltiService: ServiceAppService,
    public moduloService: ModuloService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ltiService.getDadosCompletos();
    this.idTopico = this.ltiService.dados_completos.topicos[
      this.moduloService.controll_topico
    ].id
    console.log(this.idTopico)
    if (this.ltiService.dados_completos) {
      this.quantidadeTopicos = this.ltiService.dados_completos.topicos;
      this.ltiService.quantidadeTopicos = this.quantidadeTopicos.length;
      this.tokenStorage = this.ltiService.dados_completos.user.ltik;
      console.log(this.respondidoOficialmente);
    }
    if (this.moduloService.controll_topico === this.quantidadeTopicos.length - 1) {
      this.gradeIn = false;
    }

    this.atualizarQuestao();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idTopico']) {
      this.atualizarQuestao();
    }
  }

  atualizarQuestao() {
    this.questao =
      this.ltiService.dados_completos.topicos[
        this.moduloService.controll_topico
      ].Exercicios[0];
    console.log(this.ltiService.dados_completos.topicos?.[this.moduloService.controll_topico]);

    if (
      this.questao &&
      Array.isArray(this.questao.Alternativas) &&
      this.ltiService.dados_completos?.userTopico?.[this.moduloService.controll_topico]
        ?.UsuarioTopicos[0].encerrado == false &&
      this.ltiService.dados_completos?.userTopico?.[this.moduloService.controll_topico]
        ?.UsuarioTopicos[0].resposta_errada == null
    ) {
      this.questao.Alternativas = this.embaralharAlternativas(
        this.questao.Alternativas
      );
      const respostaCorreta = this.questao.Alternativas.find(
        (a: any) => a.correta
      );
      if (respostaCorreta) {
        this.questao.respostaCorreta = respostaCorreta.descricao;
      }
    }
    this.cd.detectChanges();
  }

  responder(resposta: string) {
    if (
      this.bloqueio[this.moduloService.controll_topico]?.encerrado == true ||
      this.respostaCorretaEnviada
    ) {
      return;
    } else if (this.questao && this.questao.respostaCorreta === resposta) {
      this.respondidoOficialmente = true;
      console.log(this.respondidoOficialmente);
      this.tratarRespostaCorreta(resposta);
    } else {
      this.resposta = resposta;
      this.respostaEnviada = true;
      this.ltiService
        .enviarRespostaIncorreta(
          this.ltiService.dados_completos.topicos[
            this.moduloService.controll_topico
          ].id,
          this.ltiService.dados_completos.user.ltik,
          resposta
        )
        .subscribe(
          (response) => {
            console.log('Resposta apos enviar a resposta incorreta', response);
            this.ltiService.removeDadosCompletos();
            this.ltiService.setDadosCompletos(response);
          },
          (error) => {
            console.log(error);
            this.ltiService.mensagem(
              'Houve um problema ao enviar a resposta incorreta'
            );
          }
        );
      this.ltiService.mensagem(
        'Resposta Errada! Clique em refazer para fazer novamente'
      );
    }
    this.cd.detectChanges();
  }

  responderAlternativo(resposta: string) {
    this.resposta = resposta;
    this.respostaEnviada = true;
    if (this.abre == null) {
      this.abre = true;
    }
  }

  refazer() {
    if (this.respostaCorretaEnviada) {
      return;
    }

    if (this.questao && Array.isArray(this.questao.Alternativas)) {
      this.questao.Alternativas = this.embaralharAlternativas(
        this.questao.Alternativas
      );
      const respostaCorreta = this.questao.Alternativas.find(
        (a: any) => a.correta
      );
      if (respostaCorreta) {
        this.questao.respostaCorreta = respostaCorreta.descricao;
      }
    }

    this.ltiService
      .enviarResetarRespostaIncorreta(
        this.ltiService.dados_completos.topicos[
          this.moduloService.controll_topico
        ].id,
        this.ltiService.dados_completos.user.ltik
      )
      .subscribe(
        (response) => {
          console.log(
            'Resposta apos tentar resetar a resposta incorreta',
            response
          );
          this.ltiService.removeDadosCompletos();
          this.ltiService.setDadosCompletos(response);
        },
        (error) => {
          console.log(error);
          this.ltiService.mensagem(
            'Houve um problema ao tentar resetar resposta incorreta'
          );
        }
      );

    this.resposta = null;
    this.respostaEnviada = false;
    this.respostaEscolhida = null;
  }

  getExplicacao(resposta: string) {
    const alternativa = this.questao?.Alternativas.find(
      (a: any) => a.descricao === resposta
    );
    return alternativa?.explicacao;
  }

  embaralharAlternativas(alternativas: any[]) {
    let alternativasEmbaralhadas = [...alternativas];
    for (let i = alternativasEmbaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alternativasEmbaralhadas[i], alternativasEmbaralhadas[j]] = [
        alternativasEmbaralhadas[j],
        alternativasEmbaralhadas[i],
      ];
    }
    return alternativasEmbaralhadas;
  }

  private tratarRespostaCorreta(resposta: string) {
    this.nota = Math.ceil(100 / this.ltiService.quantidadeTopicos);
    console.log(this.nota);
    console.log(this.ltiService.notaTotal);
    console.log(this.nota + this.ltiService.notaTotal);

    if (this.ltiService.notaTotal == 0) {
      this.ltiService.notaTotal = this.nota;
    } else {
      this.ltiService.notaTotal = this.ltiService.notaTotal + this.nota;
    }

    if (this.ltiService.notaTotal > 100) {
      this.ltiService.notaTotal = 100;
    }

    this.enviarNota();
    this.liberarProximoTopico();
    this.resposta = resposta;
    this.respostaEnviada = true;
  }

  private liberarProximoTopico() {
    this.ltiService
      .liberar(this.ltiService.dados_completos.topicos[
        this.moduloService.controll_topico
      ].id)
      .subscribe(
        (response) => {
          console.log('Proximo tópico liberado com sucesso', response);
          this.ltiService.removeDadosCompletos();
          this.ltiService.setDadosCompletos(response);
        },
        (error) => console.error('Erro ao enviar a liberação', error)
      );
  }

  public enviarNota(): void {
    const enviarNota = this.gradeIn
      ? this.ltiService.sendGradeIn
      : this.ltiService.sendGrade;
    enviarNota.call(this.ltiService, this.ltiService.notaTotal).subscribe(
      (response) => {
        console.log('Resposta apos enviar a nota pro moodle:', response);
        this.ltiService.removeDadosCompletos();
        this.ltiService.setDadosCompletos(response);

        this.ltiService.mensagem(
          'Resposta Correta! Sua nota já foi retornada para o LMS'
        );
      },
      (error) => {
        console.log(error);
        this.ltiService.mensagem(
          'Houve um problema ao enviar a nota para seu LMS'
        );
      }
    );
  }

  public SetRespostaEscolhida(respostaEscolhida: string): void {
    this.respostaEscolhida = respostaEscolhida;
  }

  public RemoveRespostaEscolhida() {
    this.respostaEscolhida = null;
  }

  clickOlho() {
    if (this.respondidoOficialmente == true) {
      this.respondidoOficialmente = false;
    }
    if (this.abre == false) {
      this.abre = true;
      return true;
    } else {
      this.abre = false;
      return false;
    }
  }
}
