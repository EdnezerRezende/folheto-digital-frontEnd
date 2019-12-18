import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { MensagemService } from "../../services/domain/mensagem.service";
import { MensagemDTO } from "../../models/mensagem.dto";
import { MensagemDetalharPage } from "../mensagem-detalhar/mensagem-detalhar";
import { MensagemCadastrarPage } from "../mensagem-cadastrar/mensagem-cadastrar";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-mensagem-listar",
  templateUrl: "mensagem-listar.html"
})
export class MensagemListarPage {
  mensagens: MensagemDTO[] = new Array<MensagemDTO>();
  mensagensSearch: MensagemDTO[] = new Array<MensagemDTO>();
  searchQuery: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mensagemService: MensagemService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public storage: StorageService
  ) {}

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando..."
    });
  }

  ionViewDidLoad() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
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
            title: "Falha",
            subTitle:
              "Não foi possível obter as Mensagens, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok"
              }
            ]
          })
          .present();
        this.navCtrl.goToRoot;
      }
    );
  }

  doRefresh(refresher) {
    this.obterLista();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  copiaListaListaMensagens() {
    return this.mensagens;
  }
  getItems(ev: any) {
    this.mensagensSearch = this.copiaListaListaMensagens();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.mensagensSearch = this.mensagensSearch.filter(item => {
        return (
          item.autor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.mensagem.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  detalhar(mensagem: MensagemDTO) {
    console.log(mensagem);
    this.navCtrl.push("MensagemDetalharPage", { mensagem: mensagem });
  }

  deletar(mensagem: MensagemDTO) {
    this._alertCtrl
      .create({
        title: "Salvar",
        subTitle: "A mensagem será deletada, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarMensagem(mensagem);
            }
          },
          { text: "Não" }
        ]
      })
      .present();
  }

  deletarMensagem(mensagem: MensagemDTO) {
    let loading = this.obterLoading();
    loading.present();

    this.mensagemService.deletarMensagem(mensagem.id).subscribe(
      () => {
        loading.dismiss();
        let listaMensagem = this.mensagens.slice(0);
        let index = listaMensagem.indexOf(mensagem);
        if (index != -1) {
          listaMensagem.splice(index, 1);
          this.mensagens = listaMensagem;
          this.mensagensSearch = this.copiaListaListaMensagens();
        }
      },
      error => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar esta Mensagem, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok"
              }
            ]
          })
          .present();
      }
    );
  }

  alterarMensagem(mensagem: MensagemDTO) {
    this.navCtrl.push("MensagemCadastrarPage", { mensagem: mensagem });
  }
}
