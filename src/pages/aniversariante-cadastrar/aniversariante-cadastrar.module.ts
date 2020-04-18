import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AniversarianteCadastrarPage } from './aniversariante-cadastrar';

@NgModule({
  declarations: [
    AniversarianteCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(AniversarianteCadastrarPage),
  ],
})
export class AniversarianteCadastrarPageModule {}
