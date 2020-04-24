import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ItemSliding,
} from "ionic-angular";
import { OfertaServicoDTO } from "../../models/ofertaServico.dto";
import { StorageService } from "../../services/storage.service";
import { OfertaServicoService } from "../../services/domain/oferta-servico.service";

@IonicPage()
@Component({
  selector: "page-ofertas-servico-listar",
  templateUrl: "ofertas-servico-listar.html",
})
export class OfertasServicoListarPage {
  servicos: OfertaServicoDTO[] = new Array<OfertaServicoDTO>();
  servicosSearch: OfertaServicoDTO[] = new Array<OfertaServicoDTO>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageComentaService: StorageService,
    private _alertCtrl: AlertController,
    private _ofertaServicoService: OfertaServicoService
  ) {}

  ionViewWillEnter() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storageComentaService.temPerfilAdminLider();
  }

  obterLista() {
    this._ofertaServicoService.buscaTodos().subscribe(
      (resposta) => {
        this.servicos = resposta;
        this.servicosSearch = this.servicos;
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter as ofertas ou os serviços, tente novamente mais tarde!",
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

  copiaLista() {
    return this.servicos;
  }
  getItems(ev: any) {
    this.servicosSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.servicosSearch = this.servicosSearch.filter((item) => {
        return (
          item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  deletar(item: OfertaServicoDTO, slidingItem: ItemSliding) {
    this._alertCtrl
      .create({
        title: "Excluir",
        subTitle: "Este Item será deletado, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarConfirmado(item);
            },
          },
          { text: "Não" },
        ],
      })
      .present();
    slidingItem.close();
  }

  deletarConfirmado(item: OfertaServicoDTO) {
    this._ofertaServicoService.deletar(item.id).subscribe(
      () => {
        let lista = this.servicos.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.servicos = lista;
          this.servicosSearch = this.copiaLista();
        }
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar esta Oferta ou Serviço, tente novamente mais tarde!",
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

  alterar(item: OfertaServicoDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("OfertasServicoCadastrarPage", { item: item });
    slidingItem.close();
  }

  detalhar(item: OfertaServicoDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("OfertasServicoDetalharPage", { item: item });
    slidingItem.close();
  }
}
