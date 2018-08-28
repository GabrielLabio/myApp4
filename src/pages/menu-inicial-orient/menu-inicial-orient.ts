import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";

import {ListaAlunosPage} from "../lista-alunos/lista-alunos";

@IonicPage()
@Component({
  selector: 'page-menu-inicial-orient',
  templateUrl: 'menu-inicial-orient.html',
})
export class MenuInicialOrientPage {

  //primeiraVez: boolean = true; //Tentativa de mostrar o toast adequadamente -- EM ANDAMENTO

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {

    console.log('MenuInicialOrientPage');

    //O CÓDIGO ABAIXO É PARA MOSTRAR A NOTA DE RODAPÉ DE 'BEM-VINDO', PORÉM NÃO FUNCIONA CORRETAMENTE
    /* this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid && this.primeiraVez==true) {
        this.toast.create({

          //abaixo são utilizadas `` (crases) ao invés de '' (aspas simples)
          //para que ${data.email} funcione -- do contrário o valor buscado
          //não será printado na tela
          message: `Bem-vindo(a): ${data.email}`,
          duration: 3000
        }).present();
        this.primeiraVez = false;
      }
      else {
        this.toast.create({
          message: 'Detalhes de autenticação não encontrados',
          duration: 3000
        }).present();
      }
    }); */
  }

  register() {
    this.navCtrl.push('RegistroPage');
  }

  listarAlunos() {
    this.navCtrl.push(ListaAlunosPage); //tem que fazer deste jeito, do contrário a página não carrega (deve ser devido ao fato da página ter que pegar informações do banco de dados)
  }
  
  
  
  ionViewDidLoad() {}

}
