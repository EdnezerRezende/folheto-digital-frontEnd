import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembrosListarPage } from './membros-listar';

@NgModule({
  declarations: [
    MembrosListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MembrosListarPage),
  ],
})
export class MembrosListarPageModule {}
