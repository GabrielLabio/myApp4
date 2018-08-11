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
import { IteracoesPage } from '../pages/iteracoes/iteracoes';

// Import the AF2 Module
import { AngularFireModule } from "angularfire2";
import { FIREBASE_CONFIG } from "./app.firebase.config"
import { AngularFireAuthModule } from "angularfire2/auth";

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'; //EM ANDAMENTO

import { IteracaoListService } from '../services/lista-iteracoes.service';
import { BlocoExListService } from '../services/lista-blocoEx.service';

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
    //CronometroPage, //Não precisa, pois já tenho o 'cronometro.module.ts'
    IteracoesPage //Se fizer do outro jeito, dá erro no Ionic Lab quando salva no VS Code 
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
    //CronometroPage, //Não precisa, pois já tenho o 'cronometro.module.ts'
    IteracoesPage //Se fizer do outro jeito, dá erro no Ionic Lab quando salva no VS Code 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase, //TEM QUE COLOCAR TAMBÉM, APARENTEMENTE
    IteracaoListService, //QUALQUER SERVIÇO (PROVIDER) PRECISA SER ADICIONADO AQUI
    BlocoExListService
  ]
})
export class AppModule {}
