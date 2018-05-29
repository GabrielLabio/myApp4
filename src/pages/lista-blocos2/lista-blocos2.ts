import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

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

  pages: any[];
  items2: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pages = [];
    var chr;
    for(let i = 0; i < 15; i++) {
      chr = String.fromCharCode(65 + i);
      this.pages.push({
        category: 'Bloco ' + chr,
        id: chr
      });
    }

    this.items2 = [];
    for(let i = 1; i < 192; i+=10) {
      this.items2.push({
        text: 'oi',
        id: i
      });
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

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {
      it: item
    });
  }

}
