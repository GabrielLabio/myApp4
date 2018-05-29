import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaBlocosPage } from './lista-blocos';

@NgModule({
  declarations: [
    ListaBlocosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaBlocosPage),
  ],
})
export class ListaBlocosPageModule {}
