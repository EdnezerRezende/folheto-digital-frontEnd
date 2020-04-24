import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevocionaisListarPage } from './devocionais-listar';

@NgModule({
  declarations: [
    DevocionaisListarPage,
  ],
  imports: [
    IonicPageModule.forChild(DevocionaisListarPage),
  ],
})
export class DevocionaisListarPageModule {}
