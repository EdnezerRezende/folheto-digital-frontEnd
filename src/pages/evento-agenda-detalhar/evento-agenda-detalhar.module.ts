import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoAgendaDetalharPage } from './evento-agenda-detalhar';

@NgModule({
  declarations: [
    EventoAgendaDetalharPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoAgendaDetalharPage),
  ],
})
export class EventoAgendaDetalharPageModule {}
