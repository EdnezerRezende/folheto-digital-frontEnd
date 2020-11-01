import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ItemSliding,
} from "ionic-angular";
import { DevocionalDTO } from "../../models/devocional.dto";
import { DevocionalService } from "../../services/domain/devocional.service";
import { StorageService } from "../../services/storage.service";
import { MembroInfo } from "../../models/membro-info";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";

@IonicPage()
@Component({
  selector: 'page-devocionais-listar-antigos',
  templateUrl: 'devocionais-listar-antigos.html',
})
export class DevocionaisListarAntigosPage {
  devocionais: DevocionalDTO[] = new Array<DevocionalDTO>();
  devocionaisSearch: DevocionalDTO[] = new Array<DevocionalDTO>();
  dadosMembro: MembroInfo = new MembroInfo();
  isPermite = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _devocionalService: DevocionalService,
    public storageComentaService: StorageService
  ) {}

  ionViewWillEnter() {
    this.dadosMembro = this.storageComentaService.getMembro();

    this.obterLista();
  }

  get perfilLogado() {
    return this.storageComentaService.temPerfilAdminLider();
  }

  private obterLista() {
    let igreja: IgrejaInfoDTO = this.storageComentaService.getIgreja();
    this._devocionalService
      .buscaTodosAntigos(igreja.id, this.dadosMembro.id)
      .subscribe(
        (resposta) => {
          this.devocionais = resposta;
          this.devocionaisSearch = this.devocionais;
        },
        (error) => {
          this._alertCtrl
            .create({
              title: "Falha",
              subTitle:
                "Não foi possível obter os devocionais, tente novamente mais tarde!",
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

  copiaLista() {
    return this.devocionais;
  }
  getItems(ev: any) {
    this.devocionaisSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.devocionaisSearch = this.devocionaisSearch.filter((item) => {
        return (
          item.referencia.book.nameU.toLowerCase().indexOf(val.toLowerCase()) >
            -1 || item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  doRefresh(refresher) {
    this.obterLista();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  deletar(item: DevocionalDTO, slidingItem: ItemSliding) {
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

  deletarConfirmado(item: DevocionalDTO) {
    this._devocionalService.deletar(item.id).subscribe(
      () => {
        let lista = this.devocionais.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.devocionais = lista;
          this.devocionaisSearch = this.copiaLista();
        }
      },
      (error) => {
        console.log(error);
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

  alterar(item: DevocionalDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("DevocionaisCadastrarPage", { item: item });
    slidingItem.close();
  }

  comentario(item: DevocionalDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("DevocionaisComentarPage", { item: item });
    slidingItem.close();
  }

  verificarLido(e, item: DevocionalDTO) {
    let isChecked = e.value;
    item.isLido = isChecked;
    return isChecked;
  }
}
