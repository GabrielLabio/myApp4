import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

//estou tentando puxar o user que fez sign in
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";

//estou tentando gravar o tempo obtido em banco de dados
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


export interface Timer {
  seconds: number;
  //secondsRemaining: number;
  secondsPassed: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@IonicPage()
@Component({
  selector: 'page-cronometro',
  templateUrl: 'cronometro.html',
})
export class CronometroPage {

  item: any;
  item2: any;
  refFinal: any;
  user = {} as User;

  //timeInSeconds: number = 2700;
  initialTimeInSeconds: number = 0;
  timer: Timer;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.item = navParams.get('it');
    this.item2 = navParams.get('it2');

    //SERVE PARA QUE OBTENHAMOS O E-MAIL DO USUÁRIO LOGADO NO MOMENTO
    //var user = firebase.auth().currentUser;
    var user = afAuth.auth.currentUser;
    if (user) {
      this.user.email = user.email;
      this.user.uid = user.uid;
      //console.log(user.email);
      //console.log(user.uid);
      //console.log(user.getIdToken); -- a ver
    } else {
      console.log("Nao foi possivel achar usuario corrente.");
    }



    //PARA QUE FAÇAMOS A GRAVAÇÃO EM BANCO
    var db = afDatabase.database;
    var ref = db.ref("users");
    this.refFinal = ref.child(user.uid + "/blocosFeitos/" + this.item.id + this.item2.id); //FUNCIONA
    
    
  }

  confirmar() {
    const confirm = this.alertCtrl.create({
      title: 'Deseja reiniciar o cronômetro?',
      message: 'Caso reinicie o cronômetro seu tempo não será salvo. Deseja fazê-lo mesmo assim?',
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

            this.initTimer() //o cronometro é reiniciado
          }
        }
      ]
    });
    confirm.present();
  }//fim 'confirmar()'


  ngOnInit() {
    this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.initialTimeInSeconds) { this.initialTimeInSeconds = 0; }

    this.timer = <Timer>{
      seconds: this.initialTimeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsPassed: this.initialTimeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsPassed);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.timer.runTimer) { return; }

      //this.timer.secondsRemaining--;
      this.timer.secondsPassed++;

      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsPassed);

      if (this.timer.secondsPassed < 86400) { //um bloco de exercícios qualquer não deve levar mais do que 24 horas para ser feito
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
      }
    }, 1000); //o tempo para que a função "rode" novamente é de 1 segundo
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  //IMPORTANTE -- PRECISAMOS DO E-MAIL DO USUÁRIO LOGADO NO MOMENTO
  gravarTempo() {
    console.log(this.user.email); //OK
    console.log(this.user.uid);

    //aqui vamos gravar o tempo gasto pelo aluno. Devemos utilizar o seu e-mail cadastrado para
    //gravar no "lugar certo" no banco de dados -- a referência já foi feita no 'constructor()'
    this.refFinal.update({
      tempoLevado: this.timer.secondsPassed,  //definido como number
      displayTime: this.timer.displayTime //definido como string
    });


    const confirm = this.alertCtrl.create({
      title: this.item.text + this.item2.id,
      message: 'Tempo levado: ' + this.timer.displayTime + '\n' + 'Gravado com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CronometroPage');
  }

}
