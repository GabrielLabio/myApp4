import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AlunoListService {
 
    private user;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
        this.user = afAuth.auth.currentUser;
    }

    getAlunoList() {
        var alunoListRef = this.db.list<any>('users/' + this.user.uid + '/alunos');
        return alunoListRef;
    }
 
    
    addAluno(aluno: any, alunoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return alunoListRef.push(aluno);
    }
 
    
    updateAluno(aluno: any, alunoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return alunoListRef.update(aluno.key, aluno); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'update()' é criada tal chave, possuindo como conteúdo o nome da chave pai
    }
 
    
    removeAluno(aluno: any, alunoListRef) { //TESTE: TROCANDO Note por any => DÁ NA MESMA (NÃO MUDA NADA)
        return alunoListRef.remove(aluno.key); //IMPORTANTE: 'note.key': no caso de não haver uma chave 'key' no mesmo nível, ao se dar o 'remove()' não há problema nenhum (o objeto é removido corretamente sem nenhum problema)
    }
}