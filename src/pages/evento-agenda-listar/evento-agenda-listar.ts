import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ItemSliding,
} from "ionic-angular";
import { AgendaEventoDTO } from "../../models/agenda-evento.dto";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AgendaEventoService } from "../../services/domain/agenda-evento.service";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-evento-agenda-listar",
  templateUrl: "evento-agenda-listar.html",
})
export class EventoAgendaListarPage {
  agendasEventos: AgendaEventoDTO[] = new Array<AgendaEventoDTO>();
  agendasEventosSearch: AgendaEventoDTO[] = new Array<AgendaEventoDTO>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendaEventoService: AgendaEventoService,
    public storage: StorageService
  ) {}

  ionViewWillEnter() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
    this._agendaEventoService.buscaTodos().subscribe(
      (resposta) => {
        this.agendasEventos = resposta;
        this.agendasEventosSearch = this.agendasEventos;
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter a agenda e ou eventos, tente novamente mais tarde!",
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
    return this.agendasEventos;
  }
  getItems(ev: any) {
    this.agendasEventosSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.agendasEventosSearch = this.agendasEventosSearch.filter((item) => {
        return (
          item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.diaSemanaAtividade.toLowerCase().indexOf(val.toLowerCase()) >
            -1 ||
          item.horaAtividade.toLowerCase().indexOf(val.toLowerCase()) > -1
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

  deletar(item: AgendaEventoDTO) {
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
  }

  deletarConfirmado(item: AgendaEventoDTO) {
    this._agendaEventoService.deletar(item.id).subscribe(
      () => {
        let lista = this.agendasEventos.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.agendasEventos = lista;
          this.agendasEventosSearch = this.copiaLista();
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

  alterar(item: AgendaEventoDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("EventoAgendaCadastrarPage", { item: item });
    slidingItem.close();
  }

  detalhar(item: AgendaEventoDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("EventoAgendaDetalharPage", { item: item });
    slidingItem.close();
  }
}
