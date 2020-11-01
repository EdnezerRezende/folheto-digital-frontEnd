import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendaEventoDTO } from '../../models/agenda-evento.dto';

@IonicPage()
@Component({
  selector: 'page-evento-agenda-detalhar',
  templateUrl: 'evento-agenda-detalhar.html',
})
export class EventoAgendaDetalharPage {

  agendaEvento: AgendaEventoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (this.navParams.get('item')){
      this.agendaEvento = this.navParams.get('item');
    }
  }

  ionViewDidLoad() {
  }

}
