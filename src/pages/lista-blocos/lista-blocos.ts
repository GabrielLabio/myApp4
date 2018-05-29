import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

/**
 * Generated class for the ListaBlocosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */





 @IonicPage()
 @Component({
   selector: 'page-lista-blocos',
   templateUrl: 'lista-blocos.html',
 })



 export class ListaBlocosPage {

     items: any[];
     items2: any[];
     itemExpandHeight: number = 1100;

     constructor(public navCtrl: NavController) {

         /*this.items = [
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false},
             {expanded: false}
         ];
         */

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



     } //fim do constructor

     expandItem(item){

         this.items.map((listItem) => {

             if(item == listItem){
                 listItem.expanded = !listItem.expanded;
             } else {
                 listItem.expanded = false;
             }

             return listItem;

         });

     }

     ionViewDidLoad() {
       console.log('ionViewDidLoad ListaBlocosPage');
     }


     itemSelected(item, item2) {
       this.navCtrl.push(DetailPage, {
         it: item,
         it2: item2
       });
     }

 }
