import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//PARA PEGAR A LISTA DO BANCO DE DADOS
import { Observable } from 'rxjs/Observable'; 
//NÃO É NECESSARIAMANTE OBRIGATÓRIO, mas deixei por desencargo de 
//consciência -- OBRIGATÓRIO MESMO É UM DOS IMPORTS ABAIXO (após ter sido baixada a versão 6 do rxjs)
import 'rxjs/add/operator/map'; /*ou este ou o de baixo, mas TEM QUE IMPORTAR UM DESTES, DO CONTRÁRIO O APP 
DÁ ERRO (JUL/2018)!!!*/
//import 'rxjs/Rx';
import { IteracaoListService } from '../../services/lista-iteracoes.service';


@IonicPage()
@Component({
  selector: 'page-iteracoes',
  templateUrl: 'iteracoes.html',
})
export class IteracoesPage {

  letra: any;
  num: any;
  uid: any;

  iteracaoList: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iteracaoListService: IteracaoListService) {

    this.letra = navParams.get('it');
    this.num = navParams.get('it2');
    this.uid = navParams.get('uid');

    this.iteracaoList = this.iteracaoListService.getIteracaoList(this.letra, this.num.key, this.uid)
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

  }

  //CONTINUAR A PARTIR DAQUI
  itemSelected(iteracao) {

    if(this.uid !== undefined || this.uid != null) {
      this.navCtrl.push('FeedbackIteracaoPage', {
        iteracao: iteracao,
        letra: this.letra,
        num: this.num,
        uid: this.uid
      });
    }
    else {
      this.navCtrl.push('DetalhesIteracaoPage', {
        iteracao: iteracao,
        letra: this.letra,
        num: this.num
      });
    }
  }

  ultimaIteracao() { //JÁ FIZEMOS ISSO NO cronometro.ts
   /*  for (let entry of this.iteracaoList) {
      console.log(entry); // 1, "string", false
  } */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IteracoesPage');
  }

}
