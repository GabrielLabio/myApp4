import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

//Todos os modelos vão ficar no folder models -- UTILIZAÇÃO DO MVC => APLICAR ISSO DAS PRÓXIMAS VEZES
import { User } from "../../models/user";

//Autenticação para o registro do usuário
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    //PARA UTILIZAR O FIREBASE (TANTO NO REGISTO QUANTO NO LOGIN), DEVO PASSAR COMO PARÂMETRO PARA O
    //CONSTRUTOR UM OBJETO !PRIVADO! DO TIPO 'AngularFireAuth'
    //Este objeto PRIVADO só deverá funcionar no scope DESTA PÁGINA
  }



async register(user: User) {
  try {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);

    if(result) {
      this.toast.create({
        message: 'Aluno cadastrado com sucesso',
        duration: 3000
      }).present();
    }

  }
  catch (e) {
    console.error(e);

    this.toast.create({
      message: 'E-mail já cadastrado ou inválido',
      duration: 3000
    }).present();
  }
 }

}
