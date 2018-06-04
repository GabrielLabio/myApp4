import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  //timeInSeconds: number = 2700;
  initialTimeInSeconds: number = 0;
  timer: Timer;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('it');
    this.item2 = navParams.get('it2');
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

  //IMPORTANTE
  gravarTempo() {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CronometroPage');
  }

}
