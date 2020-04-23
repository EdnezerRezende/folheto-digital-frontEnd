import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ItemSliding,
} from "ionic-angular";
import { MensagemService } from "../../services/domain/mensagem.service";
import { MensagemDTO } from "../../models/mensagem.dto";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-mensagem-listar",
  templateUrl: "mensagem-listar.html",
})
export class MensagemListarPage {
  mensagens: MensagemDTO[] = new Array<MensagemDTO>();
  mensagensSearch: MensagemDTO[] = new Array<MensagemDTO>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mensagemService: MensagemService,
    private _alertCtrl: AlertController,
    public storage: StorageService
  ) {}

  ionViewDidLoad() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
    this.mensagemService.buscaTodos().subscribe(
      (resposta) => {
        this.mensagens = resposta;
        this.mensagensSearch = this.mensagens;
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter as Mensagens, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok",
              },
            ],
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
      this.mensagensSearch = this.mensagensSearch.filter((item) => {
        return (
          item.autor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.mensagem.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  detalhar(mensagem: MensagemDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("MensagemDetalharPage", { mensagem: mensagem });
    slidingItem.close();
  }

  deletar(mensagem: MensagemDTO, slidingItem: ItemSliding) {
    this._alertCtrl
      .create({
        title: "Deletar",
        subTitle: "A mensagem será deletada, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarMensagem(mensagem);
            },
          },
          { text: "Não" },
        ],
      })
      .present();
    slidingItem.close();
  }

  deletarMensagem(mensagem: MensagemDTO) {
    this.mensagemService.deletarMensagem(mensagem.id).subscribe(
      () => {
        let listaMensagem = this.mensagens.slice(0);
        let index = listaMensagem.indexOf(mensagem);
        if (index != -1) {
          listaMensagem.splice(index, 1);
          this.mensagens = listaMensagem;
          this.mensagensSearch = this.copiaListaListaMensagens();
        }
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar esta Mensagem, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok",
              },
            ],
          })
          .present();
      }
    );
  }

  alterarMensagem(mensagem: MensagemDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("MensagemCadastrarPage", { mensagem: mensagem });
    slidingItem.close();
  }
}
