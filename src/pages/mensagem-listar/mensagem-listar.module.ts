import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagemListarPage } from './mensagem-listar';

@NgModule({
  declarations: [
    MensagemListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemListarPage),
  ],
})
export class MensagemListarPageModule {}
