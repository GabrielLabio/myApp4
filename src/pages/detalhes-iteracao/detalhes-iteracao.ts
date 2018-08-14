import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalhesIteracaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-iteracao',
  templateUrl: 'detalhes-iteracao.html',
})
export class DetalhesIteracaoPage {

  iteracao: any;
  letra: any;
  num: any;

  dataTermino: any;

  mensagemTempo: any;
  auxAbaixo: number = 0;
  auxDentro: number = 0;

  feedback: any;

  comentario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.iteracao = navParams.get('iteracao');
    this.letra = navParams.get('letra');
    this.num = navParams.get('num');

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

  }//constructor


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesIteracaoPage');
  }

}
