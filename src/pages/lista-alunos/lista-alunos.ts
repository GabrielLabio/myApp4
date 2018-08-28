import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import { AlunoListService } from '../../services/lista-alunos.service';

@IonicPage()
@Component({
  selector: 'page-lista-alunos',
  templateUrl: 'lista-alunos.html',
})
export class ListaAlunosPage {

  alunoList: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alunoListService: AlunoListService) {

    this.alunoList = this.alunoListService.getAlunoList()
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAlunosPage');
  }

}
