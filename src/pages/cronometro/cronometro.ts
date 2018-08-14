import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

//estou tentando puxar o user que fez sign in
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";

//estou tentando gravar o tempo obtido em banco de dados
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { IteracoesPage } from '../iteracoes/iteracoes';


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

  letra: any;
  num: any;

  refFinal: any; //será a referência para gravação dos dados; ver o 'constructor()' e o método 'gravarTempo()'
  user = {} as User;

  //timeInSeconds: number = 2700;
  initialTimeInSeconds: number = 0;
  timer: Timer;

  novaIteracao: any;

  //serve para que a alteração em banco de dados só ocorra quando clicar em "Iniciar" e não "Continuar"
  resume: number = 0;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.letra = navParams.get('it');
    this.num = navParams.get('it2');

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


    //FAZENDO QUERY PARA SABER QUAL A PRÓXIMA ITERAÇÃO DE UM BLOCO QUALQUER--
    // Get a database reference to our posts
    var db = afDatabase.database;
    var ref = db.ref("users/" + user.uid + "/blocosFeitos/" + this.letra + "/" + this.num.key + "/iteracoes");

    var ultimaIteracao;
    var ui;

    ref.orderByKey().limitToLast(1).on("child_added", function(snapshot) {
      //ultimaIteracao é um objeto JavaScript, contendo o tempo da ultima iteração em seu interior
      ultimaIteracao = snapshot.val();

      //console.log(ultimaIteracao.key); //dá undefined, porque não existe a chave 'key' dentro de ultimaIteracao

      ui = snapshot.key; //recebe a CHAVE da última iteração ocorrida (a chave é o número da iteração)
    });

    //console.log(ultimaIteracao.tempo); // SE NECESSÁRIO
    //console.log(ui); //TESTE

    if (ui == undefined)
      //var 
      this.novaIteracao = 1;
    else
      //var 
      this.novaIteracao = parseInt(ui) + 1;

    console.log(this.novaIteracao);
    //--FIM DA QUERY

    //PARA QUE FAÇAMOS A GRAVAÇÃO EM BANCO
    var db = afDatabase.database;
    var ref = db.ref("users");

    //adicionando var 'novaIteracao' para poder gravar no lugar correto
    this.refFinal = ref.child(user.uid + "/blocosFeitos/" + this.letra + "/" + this.num.key + "/iteracoes/" + this.novaIteracao); //FUNCIONA!!!
    
    
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

            //sobrescreve o que estava antes em banco
            this.refFinal.set({
              emAndamento: 1,
              displayTime: "00:00:00",
              tempo: 0
            });

            this.resume = 0; // para que o botão "Iniciar" possa gravar no banco novamente, após ter sido clicado no botão "Reiniciar"

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

    if (this.resume == 0) {
      var dataAtual = new Date(); //current Date and Time (inicio)
      var dataHoraInicio  = dataAtual.getTime(); //returns timestamp

      this.refFinal.update({
        dataHoraInicio: dataHoraInicio,
        emAndamento: 1,
        displayTime: "00:00:00", //caso o usuário saia antes de clicar em "Pausar"
        tempo: 0
      });
    }
    
  }

  pauseTimer() {
    this.timer.runTimer = false;

    //É aqui que eu quero adicionar: dataHoraInicio, dataHoraTermino, emAndamento, dataTermino
    var dataAtual = new Date(); //quando não temos argumento no construtor, o objeto fica com a DATA e TEMPO atuais da chamada do construtor 
    var dataHoraTermino = dataAtual.getTime(); //returns timestamp
    

    this.refFinal.update({
      dataHoraTermino: dataHoraTermino,
      tempo: this.timer.secondsPassed,  //definido como number -- estava 'tempoLevado' mas mudei para 'tempo'
      displayTime: this.timer.displayTime //definido como string
    });
  }

  resumeTimer() {
    this.resume = 1;
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
      emAndamento: 0,
    });


    const confirm = this.alertCtrl.create({
      title: 'Bloco ' + this.letra + this.num.key,
      message: 'Iteração ' + this.novaIteracao + '.<br>Tempo levado: ' + this.timer.displayTime + '.<br>Gravado com sucesso.',
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
    confirm.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CronometroPage');
  }

}
