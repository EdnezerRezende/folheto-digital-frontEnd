import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemDTO } from '../../models/mensagem.dto';

@IonicPage()
@Component({
  selector: 'page-mensagem-detalhar',
  templateUrl: 'mensagem-detalhar.html',
})
export class MensagemDetalharPage {
  mensagem: MensagemDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (this.navParams.get('mensagem')){
      this.mensagem = this.navParams.get('mensagem');
    }
  }

  ionViewDidLoad() {
  }


}
