import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DevocionalDTO } from '../../models/devocional.dto';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DevocionalService } from '../../services/domain/devocional.service';


@IonicPage()
@Component({
  selector: 'page-devocionais-cadastrar',
  templateUrl: 'devocionais-cadastrar.html',
})
export class DevocionaisCadastrarPage {
  devocional:DevocionalDTO = new DevocionalDTO();
  formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _devocionalService: DevocionalService
  ) {
    this.criarFormulario();
    if (this.navParams.get('item')) {
      this.devocional = this.navParams.get('item');
    }

    console.log(this.devocional);
  }

  ionViewDidLoad() {
    
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      referencia: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }


  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvar() {
    let loading = this.obterLoading();
    loading.present();

    this.devocional.idIgreja = 1;

    this._devocionalService.salvar(this.devocional).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O Devocional ' + this.devocional.referencia + ' foi adicionado com sucesso, deseja incluir Outro?',
            buttons: [
              {
                text: 'Sim',
                handler: () => {
                  this.criarFormulario();
                }
              },
              {
                text: 'Não',
                handler: () => {
                  this.navCtrl.setRoot('TabsPage');
                }
              }
            ]
          })
          .present();
      },
      error => {
        loading.dismiss();
        this.navCtrl.goToRoot;
      }
    );
  }

}
