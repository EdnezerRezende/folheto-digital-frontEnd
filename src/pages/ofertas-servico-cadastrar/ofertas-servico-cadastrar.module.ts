import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertasServicoCadastrarPage } from './ofertas-servico-cadastrar';
import { RichTextModule } from 'ionic-rich-text/dist/rich-text-module';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    OfertasServicoCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertasServicoCadastrarPage),
    RichTextModule,
    BrMaskerModule
  ],
})
export class OfertasServicoCadastrarPageModule {}
