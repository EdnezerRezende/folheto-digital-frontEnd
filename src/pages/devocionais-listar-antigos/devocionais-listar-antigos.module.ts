import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevocionaisListarAntigosPage } from './devocionais-listar-antigos';

@NgModule({
  declarations: [
    DevocionaisListarAntigosPage,
  ],
  imports: [
    IonicPageModule.forChild(DevocionaisListarAntigosPage),
  ],
})
export class DevocionaisListarAntigosPageModule {}
