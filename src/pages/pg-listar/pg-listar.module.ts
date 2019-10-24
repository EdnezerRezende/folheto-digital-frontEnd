import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PgListarPage } from './pg-listar';

@NgModule({
  declarations: [
    PgListarPage,
  ],
  imports: [
    IonicPageModule.forChild(PgListarPage),
  ],
})
export class PgListarPageModule {}
