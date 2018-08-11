import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail'; //nao está sendo usada no momento

//import { CronometroPage } from '../cronometro/cronometro';
import { IteracoesPage } from '../iteracoes/iteracoes';

//estou tentando puxar o user que fez sign in
//import { AngularFireAuth } from "angularfire2/auth";

//import { IonicPage } from 'ionic-angular/navigation/ionic-page'; //ACHO QUE NÃO PRECISA


//PARA PEGAR A LISTA DO BANCO DE DADOS
import { Observable } from 'rxjs/Observable'; 

import 'rxjs/add/operator/map'; /*ou este ou o de baixo, mas TEM QUE IMPORTAR UM DESTES, DO CONTRÁRIO O APP DÁ ERRO (JUL/2018)!!!*/
//import 'rxjs/Rx';
import { BlocoExListService } from '../../services/lista-blocoEx.service';


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

  letraList: Observable<any[]>;
  numList: Observable<any[]>;

  //private afAuth: AngularFireAuth, //não sei se precisa
  constructor(public navCtrl: NavController, public navParams: NavParams, private blocoExListService: BlocoExListService) {

    //SERVE PARA QUE OBTENHAMOS O E-MAIL DO USUÁRIO LOGADO NO MOMENTO -- NÃO SEI SE PRECISA
    /* var user = afAuth.auth.currentUser;
    if (user) {
      console.log(user.uid);
    } else {
      console.log("Nao foi possivel achar usuario corrente.");
    } */


    //para obter as LETRAS do servidor
    this.letraList = this.blocoExListService.getLetraList()
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });
    

    
    
    //Preenchendo lista de letras -- ESTATICAMENTE
    /* this.items = [];
    var chr;
    for(let i = 0; i < 15; i++) {
      chr = String.fromCharCode(65 + i);
      this.items.push({
        text: 'Bloco ' + chr,
        id: chr
      });
    } */

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
    this.navCtrl.push(IteracoesPage, {
      it: item,
      it2: item2
    });
  }

  listarNumeros(idx, letra) {
    if(this.isLevel1Shown(idx)) {

      //para obter os NUMEROS E SUA INFORMACAO DO SERVIDOR
      this.numList = this.blocoExListService.getNumList(letra)
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
    }
  }
}
