import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Note } from '../model/note.model';
 
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class IteracaoListService {
 
    //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
    //private noteListRef = this.db.list<Note>('itens'); /*tem que mudar para o root 
    //do seu projeto do Firebase (Realtime Database)*/
 
    private user;
    private uid;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
        this.user = afAuth.auth.currentUser;
        this.uid = this.user.uid;
    }

    getIteracaoList(letra, num, uid) {

        if(uid != undefined || uid != null) {
            this.uid = uid;
        }

        var iteracaoListRef = this.db.list<any>('users/' + this.uid + '/blocosFeitos/' + letra + '/' + num + '/iteracoes');
        return iteracaoListRef;
    }
 
    
    addIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.push(iteracao);
    }
 
    
    updateIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.update(iteracao.key, iteracao); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'update()' é criada tal chave, possuindo como conteúdo o nome da chave pai
    }
 
    
    removeIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.remove(iteracao.key); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'remove()' não há problema nenhum (o objeto é removido corretamente sem nenhum problema)
    }
}