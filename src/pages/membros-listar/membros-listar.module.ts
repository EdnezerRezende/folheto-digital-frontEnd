import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembrosListarPage } from './membros-listar';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MembrosListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MembrosListarPage),
    BrMaskerModule
  ],
})
export class MembrosListarPageModule {}
