import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevocionaisCadastrarPage } from './devocionais-cadastrar';

@NgModule({
  declarations: [
    DevocionaisCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(DevocionaisCadastrarPage),
  ],
})
export class DevocionaisCadastrarPageModule {}
