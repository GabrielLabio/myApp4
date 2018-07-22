import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { AngularFireAuth } from "angularfire2/auth";


import { ListaBlocos2Page } from '../lista-blocos2/lista-blocos2';

/**
 * Generated class for the MenuInicialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-inicial',
  templateUrl: 'menu-inicial.html',
})
export class MenuInicialPage {

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({

          //abaixo são utilizadas `` (crases) ao invés de '' (aspas simples)
          //para que ${data.email} funcione -- do contrário o valor buscado
          //não será printado na tela
          message: `Bem-vindo(a): ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: 'Detalhes de autenticação não encontrados',
          duration: 3000
        }).present();
      }
    });
  }

listaBlocos() {
  this.navCtrl.push(ListaBlocos2Page, {});
}


register() {
  this.navCtrl.push('RegistroPage');
}



relatorioDesempenho() {
  //a ser implementado
}

messenger() {
  //a ser implementado
}




  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuInicialPage');
  }

}
