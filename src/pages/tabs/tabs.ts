import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TelaLoginPage } from '../tela-login/tela-login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TelaLoginPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
