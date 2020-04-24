import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoletimPage } from './boletim';

@NgModule({
  declarations: [
    BoletimPage,
  ],
  imports: [
    IonicPageModule.forChild(BoletimPage),
  ],
})
export class BoletimPageModule {}
