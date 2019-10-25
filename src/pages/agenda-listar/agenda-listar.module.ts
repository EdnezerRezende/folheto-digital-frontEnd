import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaListarPage } from './agenda-listar';

@NgModule({
  declarations: [
    AgendaListarPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaListarPage),
  ],
})
export class AgendaListarPageModule {}
