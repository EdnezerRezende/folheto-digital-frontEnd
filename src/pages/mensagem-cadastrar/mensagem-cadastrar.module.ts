import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagemCadastrarPage } from './mensagem-cadastrar';
import { RichTextModule } from 'ionic-rich-text/dist/rich-text-module';

@NgModule({
  declarations: [
    MensagemCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemCadastrarPage),
    RichTextModule
  ],
})
export class MensagemCadastrarPageModule {}
