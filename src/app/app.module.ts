import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DetailPage } from '../pages/detail/detail';

import { TelaLoginPage } from '../pages/tela-login/tela-login';

//lista de Blocos Kumon
import { ListaBlocosPage } from '../pages/lista-blocos/lista-blocos';
import { ExpandableComponent } from '../components/expandable/expandable';


import { ListaBlocos2Page } from '../pages/lista-blocos2/lista-blocos2';

import { CronometroPage } from '../pages/cronometro/cronometro';

// Import the AF2 Module
import { AngularFireModule } from "angularfire2";
import { FIREBASE_CONFIG } from "./app.firebase.config"
import { AngularFireAuthModule } from "angularfire2/auth";

import { AngularFireDatabaseModule } from 'angularfire2/database'; //EM ANDAMENTO

// AF2 Settings
/*export const firebaseConfig = {
  apiKey: "AIzaSyCi2mBNgmAoC6EJL16s9p-HiLT_Y5j7pfM",
  authDomain: "myapp4-d3dac.firebaseapp.com",
  databaseURL: "https://myapp4-d3dac.firebaseio.com",
  projectId: "myapp4-d3dac",
  storageBucket: "myapp4-d3dac.appspot.com",
  messagingSenderId: "999293097055"
};*/



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    TelaLoginPage,
    ListaBlocosPage,
    ExpandableComponent, //Se não colocar esse cara aqui, a ACCORDION LIST NAO FUNCIONA (TELA EM BRANCO)
    ListaBlocos2Page,
    CronometroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), //ATENCAO -- NAO SEI SE ESTA VIRGULA DA ALGUM PROBLEMA
    AngularFireModule.initializeApp(FIREBASE_CONFIG),//**EM ANDAMENTO
    AngularFireAuthModule,
    AngularFireDatabaseModule //**EM ANDAMENTO
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    TelaLoginPage,
    ListaBlocosPage,
    ExpandableComponent, //Eu tinha deixado comentado e não aconteceu nada, mas vou deixar assim só por precaução
    ListaBlocos2Page,
    CronometroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
