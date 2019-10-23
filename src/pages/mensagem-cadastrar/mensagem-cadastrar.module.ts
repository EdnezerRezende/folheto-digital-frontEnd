import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagemCadastrarPage } from './mensagem-cadastrar';

@NgModule({
  declarations: [
    MensagemCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemCadastrarPage),
  ],
})
export class MensagemCadastrarPageModule {}
