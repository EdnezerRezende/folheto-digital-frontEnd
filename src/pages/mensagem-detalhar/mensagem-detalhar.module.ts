import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MensagemDetalharPage } from './mensagem-detalhar';

@NgModule({
  declarations: [
    MensagemDetalharPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemDetalharPage),
  ],
})
export class MensagemDetalharPageModule {}
