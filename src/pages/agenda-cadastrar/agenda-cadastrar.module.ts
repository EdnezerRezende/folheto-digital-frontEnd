import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaCadastrarPage } from './agenda-cadastrar';

@NgModule({
  declarations: [
    AgendaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaCadastrarPage),
  ],
})
export class AgendaCadastrarPageModule {}
