import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PgCadastrarPage } from './pg-cadastrar';

@NgModule({
  declarations: [
    PgCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(PgCadastrarPage),
  ],
})
export class PgCadastrarPageModule {}
