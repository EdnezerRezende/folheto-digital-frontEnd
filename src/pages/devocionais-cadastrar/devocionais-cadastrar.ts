import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevocionalDTO } from '../../models/devocional.dto';


@IonicPage()
@Component({
  selector: 'page-devocionais-cadastrar',
  templateUrl: 'devocionais-cadastrar.html',
})
export class DevocionaisCadastrarPage {

  devocional:DevocionalDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('item')) {
      this.devocional = this.navParams.get('item');
    }

    console.log(this.devocional);
  }

}
