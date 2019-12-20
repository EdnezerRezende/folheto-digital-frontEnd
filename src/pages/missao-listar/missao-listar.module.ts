import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissaoListarPage } from './missao-listar';

@NgModule({
  declarations: [
    MissaoListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MissaoListarPage),
  ],
})
export class MissaoListarPageModule {}
