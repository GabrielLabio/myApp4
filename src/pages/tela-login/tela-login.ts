import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";

//Autenticação para o login do usuário
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the TelaLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tela-login',
  templateUrl: 'tela-login.html',
})
export class TelaLoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    //PARA UTILIZAR O FIREBASE (TANTO NO REGISTO QUANTO NO LOGIN), DEVO PASSAR COMO PARÂMETRO PARA O
    //CONSTRUTOR UM OBJETO !PRIVADO! DO TIPO 'AngularFireAuth'
    //Este objeto PRIVADO só deverá funcionar no scope DESTA PÁGINA
  }



  async login(user: User){
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);

      if (result) {

      //se você colocar o nome da página (que quer fazer o push) entre '', não há necessidade
      //de fazer o import da página no topo do arquivo!

      //o 'setRoot()', diferentemente do 'push()', faz com que página chamada não tenha Back Button
      this.navCtrl.setRoot('MenuInicialPage', {
        usr: user
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


  register() {
    this.navCtrl.push('RegistroPage');
  }

}
