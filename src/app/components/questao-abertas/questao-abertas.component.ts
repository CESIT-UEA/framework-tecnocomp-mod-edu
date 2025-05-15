import { ModuloService } from 'src/app/personalizavel/modulo.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAppService } from 'src/app/service-app.service';

@Component({
  selector: 'app-questao-abertas',
  templateUrl: './questao-abertas.component.html',
  styleUrls: ['./questao-abertas.component.css'],
})
export class QuestaoAbertasComponent {
  form: FormGroup;
  loading = false;
  nota: number | null = null;
  justificativa: string | null = null;
  tipo_resposta: string | null = null;
  teto: number = Math.ceil(
    100 / this.ltiService.dados_completos.topicos.length
  );
  gradeIn = true;

  status: 'success' | 'fail' | null = null;

  pergunta = this.ltiService.dados_completos.topicos?.[this.moduloService.controll_topico]?.Exercicios?.[0].questao; // Pode ser dinâmico futuramente

  constructor(
    private fb: FormBuilder,
    private ltiService: ServiceAppService,
    public moduloService: ModuloService
  ) {
    this.form = this.fb.group({
      resposta: ['', Validators.required],
    });
  }

  enviarResposta() {
    if (this.form.invalid) return;

    this.loading = true;
    this.nota = null;
    this.justificativa = null;
    this.status = null;

    const payload = {
      pergunta: this.pergunta,
      respostaAluno: this.form.value.resposta,
      teto: this.teto,
    };

    this.ltiService.enviarResposta(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.nota = res.output.nota;
        this.justificativa = res.output.justificativa;
        this.teto = res.output.teto;
        this.tipo_resposta = res.output.tipo_resposta;
        this.status =
          this.tipo_resposta != 'resposta que precisa ser melhorada'
            ? 'success'
            : 'fail';
        this.loading = false;
        if (this.tipo_resposta != 'resposta que precisa ser melhorada') {
          if (this.nota != null) {
            this.tratarRespostaCorreta(this.nota);
          }
        }
      },
      error: (err) => {
        console.error('Erro ao corrigir:', err);
        this.loading = false;
      },
    });
  }

  private tratarRespostaCorreta(nota: number) {
    console.log(nota);
    console.log(this.ltiService.notaTotal);
    console.log(nota + this.ltiService.notaTotal);

    if (this.ltiService.notaTotal == 0) {
      this.ltiService.notaTotal = nota;
    } else {
      this.ltiService.notaTotal = this.ltiService.notaTotal + nota;
    }

    if (this.ltiService.notaTotal > 100) {
      this.ltiService.notaTotal = 100;
    }

    this.enviarNota();
    this.liberarProximoTopico();
    /*     this.resposta = resposta;
    this.respostaEnviada = true; */
  }

  private liberarProximoTopico() {
    this.ltiService
      .liberar(
        this.ltiService.dados_completos.topicos?.[
          this.moduloService.controll_topico
        ].id
      )
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
}
