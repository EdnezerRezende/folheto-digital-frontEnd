import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { MensagemDTO } from '../../models/mensagem.dto';
import { MensagemDetalharPage } from '../mensagem-detalhar/mensagem-detalhar';

@IonicPage()
@Component({
  selector: 'page-mensagem-listar',
  templateUrl: 'mensagem-listar.html'
})
export class MensagemListarPage {
  mensagens: MensagemDTO[] = new Array<MensagemDTO>();
  mensagensSearch: MensagemDTO[] = new Array<MensagemDTO>();
  searchQuery: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mensagemService: MensagemService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewDidLoad() {
    let loading = this.obterLoading();
    loading.present();
    this.mensagemService.buscaTodos().subscribe(
      resposta => {
        loading.dismiss();
        this.mensagens = resposta;
        
        this.mensagensSearch = this.mensagens;
      },
      error => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: 'Falha',
            subTitle: 'Não foi possível obter as Mensagens, tente novamente mais tarde!',
            buttons: [
              {
                text: 'Ok'
              }
            ]
          })
          .present();
        this.navCtrl.goToRoot;
      }
    );
  }

  copiaListaListaMensagens() {
    return this.mensagens;
  }
  getItems(ev: any) {
    this.mensagensSearch = this.copiaListaListaMensagens();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.mensagensSearch = this.mensagensSearch.filter(item => {
        return (
          item.autor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.mensagem.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  detalhar( mensagem: MensagemDTO ){
    console.log(mensagem);
    this.navCtrl.push(MensagemDetalharPage.name, {mensagem: mensagem});
  }
}
