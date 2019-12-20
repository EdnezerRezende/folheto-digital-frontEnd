import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MissaoDTO } from '../../models/missao.dto';
import { MissaoService } from '../../services/domain/missao.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-missao-listar',
  templateUrl: 'missao-listar.html',
})
export class MissaoListarPage {

  missoes: MissaoDTO[] = new Array<MissaoDTO>();
  missoesSearch: MissaoDTO[] = new Array<MissaoDTO>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public missaoService: MissaoService,
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
    this.missaoService.buscaTodos().subscribe(
      resposta => {
        loading.dismiss();
        this.missoes = resposta;
        this.missoesSearch = this.missoes;
      },
      error => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter as missoes, tente novamente mais tarde!",
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

  copiaListaListaMissoes() {
    return this.missoes;
  }
  getItems(ev: any) {
    this.missoesSearch = this.copiaListaListaMissoes();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.missoesSearch = this.missoesSearch.filter(item => {
        return (
          item.autor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.mensagem.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  detalhar(missao: MissaoDTO) {
    this.navCtrl.push("MissaoDetalharPage", { missao: missao });
  }

  deletar(missao: MissaoDTO) {
    this._alertCtrl
      .create({
        title: "Deletar",
        subTitle: "A Missão será deletada, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarMissao(missao);
            }
          },
          { text: "Não" }
        ]
      })
      .present();
  }

  deletarMissao(missao: MissaoDTO) {
    let loading = this.obterLoading();
    loading.present();

    this.missaoService.deletarMissao(missao.id).subscribe(
      () => {
        loading.dismiss();
        let listaMissao = this.missoes.slice(0);
        let index = listaMissao.indexOf(missao);
        if (index != -1) {
          listaMissao.splice(index, 1);
          this.missoes = listaMissao;
          this.missoesSearch = this.copiaListaListaMissoes();
        }
      },
      error => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar esta Missão, tente novamente mais tarde!",
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

  alterarMissao(missao: MissaoDTO) {
    this.navCtrl.push("MissaoCadastrarPage", { missao: missao });
  }

}
