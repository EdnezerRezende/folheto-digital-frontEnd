import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ItemSliding,
} from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { AniversarianteService } from "../../services/domain/aniversariante.service";
import { AniversarianteInfoDTO } from "../../models/aniversariante-info.dto";

@IonicPage()
@Component({
  selector: "page-aniversariantes-listar",
  templateUrl: "aniversariantes-listar.html",
})
export class AniversariantesListarPage {
  aniversariantes: AniversarianteInfoDTO[] = new Array<AniversarianteInfoDTO>();
  aniversariantesSearch: AniversarianteInfoDTO[] = new Array<
    AniversarianteInfoDTO
  >();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _aniversarianteService: AniversarianteService,
    private localStorage: StorageService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.obterLista();
  }

  private obterLista() {
    let loading = this.obterLoading();
    loading.present();
    let igreja: IgrejaInfoDTO = this.localStorage.getIgreja();
    this._aniversarianteService.buscaTodosAnviversariantes(igreja.id).subscribe(
      (resposta) => {
        loading.dismiss();
        this.aniversariantes = resposta;
        this.aniversariantesSearch = resposta;
      },
      (error) => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter os aniversariantes, tente novamente mais tarde!",
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

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando...",
    });
  }

  doRefresh(refresher) {
    this.obterLista();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  copiaLista() {
    return this.aniversariantes;
  }
  getItems(ev: any) {
    this.aniversariantesSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.aniversariantesSearch = this.aniversariantesSearch.filter((item) => {
        return (
          item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.dataNascimento.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  get perfilLogado() {
    return this.localStorage.temPerfilAdminLider();
  }

  deletar(item: AniversarianteInfoDTO, slidingItem: ItemSliding) {
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

  deletarConfirmado(item: AniversarianteInfoDTO) {
    let loading = this.obterLoading();
    loading.present();

    this._aniversarianteService.deletar(item.id).subscribe(
      () => {
        loading.dismiss();
        let lista = this.aniversariantes.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.aniversariantes = lista;
          this.aniversariantesSearch = this.copiaLista();
        }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar este Aniversariante, tente novamente mais tarde!",
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

  alterar(item: AniversarianteInfoDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("AniversarianteCadastrarPage", { item: item });
    slidingItem.close();
  }
}
