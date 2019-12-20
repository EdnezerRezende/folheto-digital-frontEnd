import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissaoDetalharPage } from './missao-detalhar';

@NgModule({
  declarations: [
    MissaoDetalharPage,
  ],
  imports: [
    IonicPageModule.forChild(MissaoDetalharPage),
  ],
})
export class MissaoDetalharPageModule {}
