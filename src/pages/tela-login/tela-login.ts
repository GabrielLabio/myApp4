import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";

//Autenticação para o login do usuário, bem como determinação do seu papel
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-tela-login',
  templateUrl: 'tela-login.html',
})
export class TelaLoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    //PARA UTILIZAR O FIREBASE (TANTO NO REGISTO QUANTO NO LOGIN), DEVO PASSAR COMO PARÂMETRO PARA O
    //CONSTRUTOR UM OBJETO !PRIVADO! DO TIPO 'AngularFireAuth'
    //Este objeto PRIVADO só deverá funcionar no scope DESTA PÁGINA
  }

  async login(user: User){
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result.user.uid);

      if (result) {
        
        //Descobrindo se quem está acessando é um "aluno" ou "orientador"
        var db = this.afDatabase.database;
        var ref = db.ref("users/" + result.user.uid + "/tipoUser"); //'result.user.uid' funciona sem nenhum problema

        //'once()' é assíncrono, por isso o redirecionamento de página tem de ficar dentro dele (senão dá erro)
        //O USO DA ARROW FUNCTION LOGO ABAIXO É MUITO IMPORTANTE (se user 'function()' dá erro!!!)
        ref.once('value').then((snapshot) => { //não estava conseguindo identificar o navCtrl porque eu não estava usando arrow function

          var tipoUser = snapshot.val(); //o que tem dentro de 'tipoUser' não é uma key, por isso não dá certo chamar 'snapshot.key' (vai retornar "tipoUser" e não "aluno" -- neste caso, o que está retornando "aluno" é o próprio 'snapshot.val()' mesmo). Para ser claro, 'tipoUser' está recebendo uma String (isso quando recebe algo)

          if (tipoUser == "aluno") {
            //se você colocar o nome da página (que quer fazer o push) entre '', não há necessidade
            //de fazer o import da página no topo do arquivo!
            //o 'setRoot()', diferentemente do 'push()', faz com que página chamada não tenha Back Button
            this.navCtrl.setRoot('MenuInicialPage', {
              usr: user
            });
          }
          else if (tipoUser == "orientador") {
            this.navCtrl.setRoot('MenuInicialOrientPage', {
              usr: user
            });
          }
          else {
            this.toast.create({
              message: 'Acesso negado: tipo de usuário indefinido',
              duration: 3000
            }).present();
          }
        });
      }
    }
    catch (e) {
      console.error(e);

      this.toast.create({
        message: 'E-mail e/ou senha inválidos',
        duration: 3000
      }).present();
    }
  }


}
