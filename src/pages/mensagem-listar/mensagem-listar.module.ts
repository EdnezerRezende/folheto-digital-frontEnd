import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MensagemListarPage } from './mensagem-listar';

@NgModule({
  declarations: [
    MensagemListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemListarPage),
    IonicModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MensagemListarPageModule {}
