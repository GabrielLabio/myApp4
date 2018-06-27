import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; //EM ANDAMENTO

//songs: AngularFireList; -- ESTÁ DANDO ERRO, NÃO SEI PORQUÊ. Não está deixando eu conectar com o Firebase

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  //angDatabase: AngularFireDatabase; => NÃO FUNCIONA, APARENTEMENTE TEM QUE PEGAR VAR DO CONSTRUTOR MESMO

  //INSPRESCINDÍVEL UTILIZAR VAR 'afDatabase' ADVINDA DO CONSTRUTOR -- NOTA: aparentemente, funciona usar tanto
  //'public' quanto 'private' com esta variável
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase) {

    //APRENDENDO COMO GRAVAR EM BANCO DE DADOS -- FIREBASE

    var db = afDatabase.database;
    //var db = this.angDatabase.database; => NÃO FUNCIONA, APARENTEMENTE TEM QUE PEGAR VAR DO CONSTRUTOR MESMO

    var ref = db.ref("usuarios"); //diretório que se encontra na "raiz". Caso tal diretório não exista,
    //ele é criado


    //ele nao deixa gravar nada que tenha '@' ou '.', por exemplo. Por isso, é melhor usar o uid para gravar algo 
    var usersRef = ref.child("aslasdkkdkk498982lzlal"); //é um subdiretório do diretório "usuarios". Caso
    //tal subdiretório não exista, ele é criado

    //o 'set()' apaga todos os que estiverem no mesmo nível e escreve em cima de uma quadro em branco
    //(mesmo que a key já exista ou não)
    //no caso, vai apagar tudo dentro de "aslasdkkdkk498982lzlal" e preencher com o conteúdo abaixo
    usersRef.set({
      uid: "1111111",
      password: "758838",
  
      blocosFeitos: {
        a001: {
          tempoLevado: "00:40:00"
        }
      }
    });

    //o 'update()' não altera os "colegas" de mesmo nível, só aqueles cujas keys sejam as mesmas do update 
    //caso não haja uma key para sofrer o update, a mesma é criada -- ou seja, é adicionado um elemento ao objeto;
    //se eu der uma update em um "pai", eu apago o seu conteúdo e substituo com o conteúdo do upadate
    var hopperRef = usersRef.child("blocosFeitos");
    hopperRef.update({
      a001: {
        tempoLevado: "00:03:00"
      },
      a002: {
        tempoLevado: "00:49:00"
      },
      a003: {
        tempoLevado: "00:50:00"
      }, 
      a004: {
        tempoLevado: "00:51:00"
      }, 
      a005: {
        tempoLevado: "00:52:00"
      },
      a006: {
        tempoLevado: "00:17:00"
      }    
    });


    //this.songs = afDatabase.list('/songs').valueChanges(); -- CÓDIGO ANTIGO, APRENDENDO COMO PUXAR DO BANCO
  }

}
