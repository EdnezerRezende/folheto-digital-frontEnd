import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-mensagem-cadastrar',
  templateUrl: 'mensagem-cadastrar.html',
})
export class MensagemCadastrarPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.item = this.fb.control('');
  }

  ionViewDidLoad() {
    
  }
  salvar(texto){
    console.log(texto.value);
  }
}
