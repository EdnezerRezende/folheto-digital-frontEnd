import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissaoCadastrarPage } from './missao-cadastrar';
import { RichTextModule } from 'ionic-rich-text/dist/rich-text-module';

@NgModule({
  declarations: [
    MissaoCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(MissaoCadastrarPage),
    RichTextModule
  ],
})
export class MissaoCadastrarPageModule {}
