import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PgDetalharPage } from './pg-detalhar';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [PgDetalharPage],
  imports: [IonicPageModule.forChild(PgDetalharPage)],
  providers: [Camera]
})
export class PgDetalharPageModule {}
