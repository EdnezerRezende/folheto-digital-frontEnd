import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembroPerfilPage } from './membro-perfil';

@NgModule({
  declarations: [
    MembroPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(MembroPerfilPage),
  ],
})
export class MembroPerfilPageModule {}
