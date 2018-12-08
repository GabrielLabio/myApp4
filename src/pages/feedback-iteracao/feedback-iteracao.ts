import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { IteracaoListService } from '../../services/lista-iteracoes.service';

@IonicPage()
@Component({
  selector: 'page-feedback-iteracao',
  templateUrl: 'feedback-iteracao.html',
})
export class FeedbackIteracaoPage {

  iteracao: any;
  letra: any;
  num: any;

  dataTermino: any;

  mensagemTempo: any;
  auxAbaixo: number = 0;
  auxDentro: number = 0;

  feedback: any;
  comentario: any;
  iteracaoListRef: any;
  mod: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iteracaoListService: IteracaoListService, public alertCtrl: AlertController) {

    this.iteracao = navParams.get('iteracao');
    this.letra = navParams.get('letra');
    this.num = navParams.get('num');
    this.iteracaoListRef = navParams.get('iteracaoListRef');

    if (this.iteracao.emAndamento) {
      //data de término
      this.dataTermino = 'Em andamento';

      //mensagem de faixa de tempo
      this.mensagemTempo = 'Em andamento';
    }
    else {
      //data de término
      var data = new Date(this.iteracao.dataHoraTermino);
      console.log(this.iteracao.dataHoraTermino);
      this.dataTermino = data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();

      //mensagem de faixa de tempo
      var tprMinBlocoSeg = this.num.tprMin*10*60;
      var tprMaxBlocoSeg = this.num.tprMax*10*60;

      if (this.iteracao.tempo < tprMinBlocoSeg) {
        this.mensagemTempo = 'Abaixo da faixa de tempo esperado';
        this.auxAbaixo = 1;
      }
      else if (this.iteracao.tempo <= tprMaxBlocoSeg) {
        this.mensagemTempo = "Dentro da faixa de tempo esperado";
        this.auxDentro = 1;
      }
      else {
        this.mensagemTempo = 'Acima da faixa de tempo esperado';
      }
    }
    
    //tratamento do feedback do orientador
    if (this.iteracao.statusFeedback == undefined || this.iteracao.statusFeedback == null) {
      this.feedback = 'Não avaliado';
    }
    else {
      this.feedback = this.iteracao.statusFeedback;
    }

    //tratamento do comentário do orientador
    if (this.iteracao.comentarioOrientador == undefined || this.iteracao.comentarioOrientador == null) {
      this.comentario = 'Nenhum comentário no momento';
    }
    else {
      this.comentario = this.iteracao.comentarioOrientador;
    }

  } //construtor

  atualizarStatus() {

    this.mod = {
      statusFeedback: this.feedback,
      comentarioOrientador: this.comentario
    }

    this.iteracaoListService.updateIteracao(this.iteracao, this.mod, this.iteracaoListRef);

    //janela de alerta informando que a operação foi realizada com sucesso
    const confirm = this.alertCtrl.create({
      title: 'Atualização bem-sucedida',
      message: 'A atualização do status do bloco de exercícios foi realizada com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackIteracaoPage');
  }

}
