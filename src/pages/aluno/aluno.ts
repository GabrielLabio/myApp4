import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListaBlocos2Page } from '../lista-blocos2/lista-blocos2';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.email = navParams.get('email');
    this.nome = navParams.get('nome'); 
    this.numMatricula = navParams.get('numMatricula');
    this.uid = navParams.get('uid'); 
  }

  editarAluno() {
    this.navCtrl.push('EditarAlunoPage', {
      email: this.email,
      nome: this.nome,
      numMatricula: this.numMatricula,
      uid: this.uid
    });
  }

  excluirAluno() {
    const confirm = this.alertCtrl.create({
      title: 'Deseja realmente excluir o aluno?',
      message: 'Caso exclua, os dados referentes ao mesmo serão perdidos. Deseja fazê-lo mesmo assim?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');

            //Informação de autenticação e de acesso ao banco
            var usuarioCorrente = this.afAuth.auth.currentUser;
            var db = this.afDatabase.database;

            //Desliga o aluno do orientador no banco de dados
            var ref = db.ref("users/" + usuarioCorrente.uid + "/alunos/" + this.uid);
            ref.remove();
            
            //Tira o aluno como usuário no banco de dados
            var ref = db.ref("users/" + this.uid);
            ref.remove();

            const confirm2 = this.alertCtrl.create({
              title: 'Exclusão efetuada',
              message: 'A exclusão do aluno foi realizada com êxito.',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    console.log('Ok clicked');
                    
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            confirm2.present();
        
            //this.navCtrl.pop(); -- não precisa, o de cima já dá conta do serviço
          }
        }
      ]
    });
    confirm.present();

  }

  listaBlocos() {
    this.navCtrl.push(ListaBlocos2Page, {
      uid: this.uid
    });
  }

  sendEmail() {
    this.navCtrl.push('EmailAlunoPage', {
      email: this.email,
      nome: this.nome,
      numMatricula: this.numMatricula,
      uid: this.uid
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlunoPage');
  }

}
