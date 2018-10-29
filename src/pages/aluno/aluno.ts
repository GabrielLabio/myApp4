import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaBlocos2Page } from '../lista-blocos2/lista-blocos2';

/**
 * Generated class for the AlunoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {

  email: any;
  nome: any;
  numMatricula: any;
  uid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.email = navParams.get('email');
    this.nome = navParams.get('nome'); 
    this.numMatricula = navParams.get('numMatricula');
    this.uid = navParams.get('uid'); 
  }

  listaBlocos() {
    this.navCtrl.push(ListaBlocos2Page, {
      uid: this.uid
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlunoPage');
  }

}
