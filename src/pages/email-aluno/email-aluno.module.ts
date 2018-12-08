import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailAlunoPage } from './email-aluno';

@NgModule({
  declarations: [
    EmailAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailAlunoPage),
  ],
})
export class EmailAlunoPageModule {}
