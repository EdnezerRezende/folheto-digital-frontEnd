import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarSenhaPage } from './alterar-senha';

@NgModule({
  declarations: [
    AlterarSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarSenhaPage),
  ],
})
export class AlterarSenhaPageModule {}
