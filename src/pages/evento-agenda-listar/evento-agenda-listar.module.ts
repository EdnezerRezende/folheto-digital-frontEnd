import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoAgendaListarPage } from './evento-agenda-listar';

@NgModule({
  declarations: [
    EventoAgendaListarPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoAgendaListarPage),
  ],
})
export class EventoAgendaListarPageModule {}
