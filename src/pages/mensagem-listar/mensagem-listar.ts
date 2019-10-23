import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { MensagemDTO } from '../../models/mensagem.dto';


@IonicPage()
@Component({
  selector: 'page-mensagem-listar',
  templateUrl: 'mensagem-listar.html',
})
export class MensagemListarPage {

  mensagens: MensagemDTO[] = new Array<MensagemDTO>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mensagemService: MensagemService
    ) {
  }

  ionViewDidLoad() {
    this.mensagemService.buscaTodos()
      .subscribe(resposta => {
        console.log(resposta);
        this.mensagens = resposta;
        
      },
      error => {
        console.log("error");
        console.log(error);
      });
  }

}
