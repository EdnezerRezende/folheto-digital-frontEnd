import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MembroService } from '../../services/domain/membro.service';
import { StorageService } from '../../services/storage.service';
import { IgrejaInfoDTO } from '../../models/igreja_info.dto';
import { Membro } from '../../models/membro';

@IonicPage()
@Component({
  selector: 'page-aniversariantes-listar',
  templateUrl: 'aniversariantes-listar.html',
})
export class AniversariantesListarPage {
  aniversariantes:Membro[] = new Array<Membro>();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _membroService:MembroService, 
    private localStorage:StorageService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loading = this.obterLoading();
    loading.present();
    let igreja:IgrejaInfoDTO = this.localStorage.getIgreja();

    this._membroService.buscaTodosAnviversariantes(igreja.id).subscribe(
      resposta => {
        loading.dismiss();
        this.aniversariantes = resposta;
      },
      error => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter os aniversariantes, tente novamente mais tarde!",
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

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando..."
    });
  }
}
