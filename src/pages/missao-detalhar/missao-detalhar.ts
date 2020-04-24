import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MissaoDTO } from '../../models/missao.dto';

@IonicPage()
@Component({
  selector: 'page-missao-detalhar',
  templateUrl: 'missao-detalhar.html',
})
export class MissaoDetalharPage {
  missao: MissaoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (this.navParams.get('missao')){
      this.missao = this.navParams.get('missao');
    }
  }

  ionViewDidLoad() {
  }
}
