import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-editar-aluno',
  templateUrl: 'editar-aluno.html',
})
export class EditarAlunoPage {

  email: any;
  nome: any;
  numMatricula: any;
  uid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public alertCtrl: AlertController) {

    this.email = navParams.get('email');
    this.nome = navParams.get('nome'); 
    this.numMatricula = navParams.get('numMatricula');
    this.uid = navParams.get('uid');
  }

  atualizar() {

    //'true' caso user.Matricula seja composto SOMENTE DE DÍGITOS
    var isnum = /^\d+$/.test(this.numMatricula);

    if (this.nome == undefined || !this.nome.replace(/\s/g, '').length || this.numMatricula == undefined) {
      //Tratamento para os campos 'Nome do aluno' e 'Número de matrícula'  
      this.toast.create({
        message: 'Favor preencher todos os campos',
        duration: 3500
      }).present();

    } else if(isnum == false) {
      //Tratamento para o campo 'Número de matrícula'
      this.toast.create({
        message: '"Número de matrícula" deve conter somente números',
        duration: 3500
      }).present();

    } else { //Caso 'Nome do aluno' e 'Número de matrícula' estejam razoavelmente preenchidos

      var usuarioCorrente = this.afAuth.auth.currentUser;
      var db = this.afDatabase.database;

      //Liga o aluno ao orientador no banco de dados
      var ref = db.ref("users/" + usuarioCorrente.uid + "/alunos/" + this.uid);
      ref.update({
        nome: this.nome,
        //email: this.email, -- meio complicado para implementar neste momento
        numMatricula: this.numMatricula
      });

      //Inicializa o aluno como usuário no banco de dados
      var ref = db.ref("users/" + this.uid);
      ref.update({
        nome: this.nome,
        //email: this.email, -- meio complicado para implementar neste momento
        numMatricula: this.numMatricula,
        //tipoUser: 'aluno' -- desnecessário
      });

      const confirm = this.alertCtrl.create({
        title: 'Editado com sucesso',
        message: 'O aluno cujo e-mail é ' + this.email + ' foi editado com sucesso ',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Ok clicked');
              
              //Jeito encontrado para retornar à tela de registro com os campos já em branco (sem ter de resetar todos os campos um a um)
              this.navCtrl.pop(); //Na verdade só isto não funciona. Precisamos do código abaixo

              //////////////////////////////
              //O CÓDIGO ABAIXO FUNCIONA, CASO A LINHA DE CÓDIGO ACIMA DÊ ALGUM PROBLEMA INESPERADO
              this.navCtrl.pop();
              this.navCtrl.push('AlunoPage', {
                email: this.email,
                nome: this.nome,
                numMatricula: this.numMatricula,
                uid: this.uid
              });
              ///////////////////////////////
            }
          }
        ]
      });
      confirm.present();


    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarAlunoPage');
  }

}
