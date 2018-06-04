import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuInicialPage } from './menu-inicial';

@NgModule({
  declarations: [
    MenuInicialPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuInicialPage),
  ],
})
export class MenuInicialPageModule {}
