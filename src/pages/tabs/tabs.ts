import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { TelaLoginPage } from '../tela-login/tela-login';

import { ListaBlocosPage } from '../lista-blocos/lista-blocos';

import { ListaBlocos2Page } from '../lista-blocos2/lista-blocos2';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListaBlocos2Page;
  tab2Root = TelaLoginPage;
  tab3Root = ListaBlocosPage;

  constructor() {

  }
}
