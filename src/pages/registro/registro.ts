import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

//Todos os modelos vão ficar no folder models -- UTILIZAÇÃO DO MVC => APLICAR ISSO DAS PRÓXIMAS VEZES
import { User } from "../../models/user";

//Autenticação para o registro do usuário
import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;

  //afAuth: AngularFireAuth;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    //PARA UTILIZAR O FIREBASE (TANTO NO REGISTO QUANTO NO LOGIN), DEVO PASSAR COMO PARÂMETRO PARA O
    //CONSTRUTOR UM OBJETO !PRIVADO! DO TIPO 'AngularFireAuth'
    //Este objeto PRIVADO só deverá funcionar no scope DESTA PÁGINA
  }

  async register(user: User) {

    //'true' caso user.Matricula seja composto SOMENTE DE DÍGITOS
    var isnum = /^\d+$/.test(user.numMatricula);

    if (user.nome == undefined || !user.nome.replace(/\s/g, '').length || user.numMatricula == undefined) {
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

      try {

        //Guarda as informações de usuário do ORIENTADOR
        var usuarioCorrente = this.afAuth.auth.currentUser;

        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

        if(result) {

          var db = this.afDatabase.database;

          //Liga o aluno ao orientador no banco de dados
          var ref = db.ref("users/" + usuarioCorrente.uid + "/alunos/" + this.afAuth.auth.currentUser.uid);
          ref.update({
            nome: user.nome,
            email: user.email,
            numMatricula: user.numMatricula
          });

          //Inicializa o aluno como usuário no banco de dados
          var ref = db.ref("users/" + this.afAuth.auth.currentUser.uid);
          ref.update({
            nome: user.nome,
            email: user.email,
            numMatricula: user.numMatricula,
            tipoUser: 'aluno'
          });

          const confirm = this.alertCtrl.create({
            title: 'Cadastrado com sucesso',
            message: 'O aluno cujo e-mail é ' + user.email + ' foi cadastrado com sucesso ',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  console.log('Ok clicked');
                  
                  //Jeito encontrado para retornar à tela de registro com os campos já em branco (sem ter de resetar todos os campos um a um)
                  this.navCtrl.pop(); 
                  this.navCtrl.push('RegistroPage');
                }
              }
            ]
          });
          confirm.present();
        
        }

        //TESTE -- Mostra que usuário atual mudou
        /* console.log(this.afAuth.auth.currentUser);
        console.log(usuarioCorrente); */

        //IMPORTANTE, DO CONTRÁRIO O USUÁRIO CORRENTE FICA SENDO O ALUNO QUE FOI CADASTRADO, E NÃO MAIS O ORIENTADOR
        await this.afAuth.auth.updateCurrentUser(usuarioCorrente);

        //TESTE -- Mostra que o usuário atual voltou a ser o orientador
        /* console.log(this.afAuth.auth.currentUser); */
      }
      catch (e) {
        console.error(e);

        //TESTE -- OK
        /* console.log(this.afAuth.auth.currentUser); */

        if (e.code == "auth/argument-error") {
          this.toast.create({
            message: 'E-mail e/ou senha em branco',
            duration: 3000
          }).present();
        }

        if (e.code == "auth/invalid-email") {
          this.toast.create({
            message: 'E-mail inválido',
            duration: 3000
          }).present();
        }

        if (e.code == "auth/email-already-in-use") {
          this.toast.create({
            message: 'O e-mail já se encontra em uso',
            duration: 3000
          }).present();
        }

        if (e.code == "auth/weak-password") {
          this.toast.create({
            message: 'Senha deve possuir no mínimo 6 caracteres',
            duration: 3000
          }).present();
        }   
      }
    }  
  }
}
