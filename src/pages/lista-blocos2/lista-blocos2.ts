//import { Component } from '@angular/core';

//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail'; //nao está sendo usada no momento

import { CronometroPage } from '../cronometro/cronometro';

//estou tentando puxar o user que fez sign in
import { AngularFireAuth } from "angularfire2/auth";
//Para acesso aos tempos no banco de dados
//import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
//import { FirebaseListObservable } from "angularfire2/database-deprecated";

import { BlocoFeito } from "../../models/blocoFeito"
//import { Observable } from 'rxjs/Observable';



import { Component, Injectable } from '@angular/core';
/*import { NavController } from 'ionic-angular';*/
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { Note } from '../../model/note/note.model';


@Injectable()


@IonicPage()
@Component({
  selector: 'page-lista-blocos2',
  templateUrl: 'lista-blocos2.html',
})
export class ListaBlocos2Page {
  showLevel1 = null;
  showLevel2 = null;
  items: any[];
  items2: any[];


/*
  itemsRef: AngularFireList<any>;
  itemsO: Observable<BlocoFeito[]>;
  */

  //songsList: AngularFireList<any>;
  //songs: Observable<any[]>;

  //blocosFeitosRef$: AngularFireList<BlocoFeito[]>;
  //blocosFeitosRef$: AngularFireList<any>;
  //blocosFeitos;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    //SERVE PARA QUE OBTENHAMOS O E-MAIL DO USUÁRIO LOGADO NO MOMENTO
    
    var user = afAuth.auth.currentUser;
    if (user) {
      console.log(user.uid);
    } else {
      console.log("Nao foi possivel achar usuario corrente.");
    }
    

    //this.blocosFeitosRef$ = this.afDatabase.list("users/" + user.uid + "/blocosFeitos");

    //this.songsList = this.afDatabase.list("users/" + user.uid + "/blocosFeitos");
    //this.songs = this.songsList.valueChanges();


    /*
    this.itemsRef = afDatabase.list("users/" + user.uid + "/blocosFeitos");
    this.itemsO = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    console.log(this.itemsO);
    console.log(this.itemsRef);
    */

    //console.log(this.blocosFeitosRef$);

    //SERVE PARA QUE OBTENHAMOS A LISTA DE TEMPOS GRAVADOS EM BANCO
    
    //var db = afDatabase.database;
    //var ref = db.ref("users/" + user.uid + "/blocosFeitos");

    //this.blocosFeitos = afDatabase.list(ref).valueChanges();

    /*
    //NÃO É POSSÍVEL PREENCHER UMA VARIÁVEL DE FORA COM O 'snapshot.val()' SEM UTILIZAR "ARROW FUNCTIONS"
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      //Preenchendo lista de tempos gravados em banco de dados
      this.blocosFeitos = snapshot.val();
      //console.log(this.blocosFeitos);
    }, function (errorObject) {
      console.log("A leitura do banco falhou: " + errorObject.code);
    });
    */
    
    //MESMO QUE O CÓDIGO ACIMA, PORÉM UTILIZANDO "ARROW FUNCTIONS" PARA PODER PREENCHER O 'this.blocosFeitos'
    //CORRETAMENTE -- ISSO SE DEVE AO FATO DO CÓDIGO ESTAR RODANDO ASSINCRONAMENTE QUANDO DA CONSULTA DO 
    //BANCO DE DADOS...
    
    /*
    ref.on("value", (snapshot) => {

      //Preenchendo lista de tempos gravados em banco de dados
      this.blocosFeitos = snapshot.val();
      //console.log(this.blocosFeitos);
      console.log(snapshot.val());

    }, (errorObject) => {
      console.log("A leitura do banco falhou: " + errorObject.code);
    });
    */
    
    //Preenchendo lista de letras
    this.items = [];
    var chr;
    for(let i = 0; i < 15; i++) {
      chr = String.fromCharCode(65 + i);
      this.items.push({
        text: 'Bloco ' + chr,
        id: chr
      });
    }

    //Preenchendo lista de números
    this.items2 = [];
    for(let i = 1; i < 192; i+=10) {
      this.items2.push({
        id: i
      });
    }

  }//constructor

/*
  ionViewCanEnter() {
    this.blocosFeitos;      
  }
*/

//EM ANDAMENTO. NÃO ESTAMOS CONSEGUINDO PEGAR A INFORMAÇÃO DO BANCO CORRETAMENTE
  displayTime(it1, it2, blocosFeitos) {
    var conc = it1.id + it2.id;
    //console.log(conc); //FUNCIONA AQUI
    //return conc; //FUNCIONA AQUI

    //O PROBLEMA ESTÁ NA PROMESSA!!!
    
    //O PROBLEMA ESTÁ NO IF ABAIXO
    if (blocosFeitos.conc.displayTime == undefined || blocosFeitos.conc.displayTime == null) {
      //return conc;
      //return blocosFeitos.A1.displayTime;
      return "--:--:--";
    }
    else {
      return blocosFeitos.conc.displayTime;
    }
    
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaBlocos2Page');
  }

  itemSelected(item, item2) {
    this.navCtrl.push(CronometroPage, {
      it: item,
      it2: item2
    });
  }
}
