import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail'; //nao está sendo usada no momento

import { CronometroPage } from '../cronometro/cronometro';

/**
 * Generated class for the ListaBlocos2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = [];
    var chr;
    for(let i = 0; i < 15; i++) {
      chr = String.fromCharCode(65 + i);
      this.items.push({
        text: 'Bloco ' + chr,
        id: chr
      });
    }

    this.items2 = [];
    for(let i = 1; i < 192; i+=10) {
      this.items2.push({
        id: i
      });
    }

  }//constructor

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
