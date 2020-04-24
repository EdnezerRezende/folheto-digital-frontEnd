import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AniversariantesListarPage } from './aniversariantes-listar';

@NgModule({
  declarations: [
    AniversariantesListarPage,
  ],
  imports: [
    IonicPageModule.forChild(AniversariantesListarPage),
  ],
})
export class AniversariantesListarPageModule {}
