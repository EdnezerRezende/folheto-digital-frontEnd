import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembroAlterarPage } from './membro-alterar';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MembroAlterarPage,
  ],
  imports: [
    IonicPageModule.forChild(MembroAlterarPage),
    BrMaskerModule
  ],
})
export class MembroAlterarPageModule {}
