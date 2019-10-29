import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PgDTO } from '../../models/pg.dto';
import { PGService } from '../../services/domain/pg.service';

@IonicPage()
@Component({
  selector: 'page-pg-listar',
  templateUrl: 'pg-listar.html',
})
export class PgListarPage {

  pgs: PgDTO[] = new Array<PgDTO>();
  pgsSearch: PgDTO[] = new Array<PgDTO>();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _pgService: PGService) {
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewDidLoad() {
    let loading = this.obterLoading();
    loading.present();
    
    this._pgService.buscaTodos().subscribe(
      resposta => {
        loading.dismiss();
        this.pgs = resposta;

        this.pgsSearch = this.pgs;
      },
      error => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Falha',
            subTitle: 'Não foi possível obter os PG´s, tente novamente mais tarde!',
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
    return this.pgs;
  }
  getItems(ev: any) {
    this.pgsSearch = this.copiaListaListaMensagens();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.pgsSearch = this.pgsSearch.filter(item => {
        return (
          item.lider.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.responsavelCasa.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.endereco.cidade.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.diaSemanaAtividade.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.horaAtividade.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

}
