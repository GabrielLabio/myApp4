import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BlocoExListService {

    constructor(private db: AngularFireDatabase) { 
    
    }

    getLetraList() {
        var letraListRef = this.db.list<any>('blocosExercicios');
        return letraListRef;
    }


    getNumList(letra) {
        var numListRef = this.db.list<any>('blocosExercicios/' + letra);
        return numListRef;
    }
 
    
    /* addIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.push(iteracao);
    }
 
    
    updateIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.update(iteracao.key, iteracao); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'update()' é criada tal chave, possuindo como conteúdo o nome da chave pai
    }
 
    
    removeIteracao(iteracao: any, iteracaoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return iteracaoListRef.remove(iteracao.key); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'remove()' não há problema nenhum (o objeto é removido corretamente sem nenhum problema)
    } */
}