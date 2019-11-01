import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoAgendaCadastrarPage } from './evento-agenda-cadastrar';

@NgModule({
  declarations: [
    EventoAgendaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoAgendaCadastrarPage),
  ],
})
export class EventoAgendaCadastrarPageModule {}
