import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//songs: AngularFireList; -- ESTÁ DANDO ERRO, NÃO SEI PORQUÊ. Não está deixando eu conectar com o Firebase

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  /*constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase) {
    this.songs = afDatabase.list('/songs').valueChanges();
  }*/

}
