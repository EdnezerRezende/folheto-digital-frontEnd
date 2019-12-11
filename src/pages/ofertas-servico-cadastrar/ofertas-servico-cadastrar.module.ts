import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertasServicoCadastrarPage } from './ofertas-servico-cadastrar';
import { RichTextModule } from 'ionic-rich-text/dist/rich-text-module';

@NgModule({
  declarations: [
    OfertasServicoCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertasServicoCadastrarPage),
    RichTextModule
  ],
})
export class OfertasServicoCadastrarPageModule {}
