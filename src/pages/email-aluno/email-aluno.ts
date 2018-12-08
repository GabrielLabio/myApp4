import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-email-aluno',
  templateUrl: 'email-aluno.html',
})
export class EmailAlunoPage {

  subject='';
  body='';
  to='';

  email: any;
  nome: any;
  numMatricula: any;
  uid: any;

  constructor(public emailComposer: EmailComposer, public navCtrl: NavController, public navParams: NavParams) {

    this.email = navParams.get('email');
    this.nome = navParams.get('nome'); 
    this.numMatricula = navParams.get('numMatricula');
    this.uid = navParams.get('uid'); 

    console.log("Ola e-mail");
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        console.log("Podemos enviar");
      }
    });
     
    /* let email = {
      to: 'john@doe.com',
      cc: 'jane@doe.com',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [],
      subject: 'Teste',
      body: 'Este eh um teste enviado do meu aplicativo do Ionic.',
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email); */
  }

  send() {
    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachments: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gmail"
    };
    this.emailComposer.open(email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailAlunoPage ola');
  }

  //TESTE
  /* enviar() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'max@mustermann.de',
       cc: 'erika@mustermann.de',
       bcc: ['john@doe.com', 'jane@doe.com'],
       attachments: [
         'file://img/logo.png',
         'res://icon.png',
         'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
         'file://README.pdf'
       ],
       subject: 'Cordova Icons',
       body: 'How are you? Nice greetings from Leipzig',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
  } */

}








