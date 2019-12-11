import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfertaServicoNewDTO } from '../../models/ofertaServico-new.dto';
import { OfertaServicoService } from '../../services/domain/oferta-servico.service';
import { StorageService } from '../../services/storage.service';
import { MembroInfo } from '../../models/membro-info';


@IonicPage()
@Component({
  selector: 'page-ofertas-servico-cadastrar',
  templateUrl: 'ofertas-servico-cadastrar.html',
})
export class OfertasServicoCadastrarPage {
  item:any;
  formulario: FormGroup;
  servico:OfertaServicoNewDTO = new OfertaServicoNewDTO();

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _ofertaService: OfertaServicoService,
    private _localStorage: StorageService) {
      this.criarFormulario();
      if (this.navParams.get('item')){
        this.servico = this.navParams.get('item');
      }
  }

  ionViewDidLoad() {
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  private criarFormulario() {
    this.item = this.fb.control('');
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      telefone: [''],
      instagram: [''],
      facebook: [''],
      emailServico: [''],
      endereco: ['']
    });
  }

  salvar(){
    let loading = this.obterLoading();
    loading.present();
    let membro: MembroInfo = this._localStorage.getMembro();
    this.servico.idIgreja = membro.igrejaId;
    this._ofertaService.salvar(this.servico).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O serviço foi adicionada com sucesso, deseja incluir Outro?',
            buttons: [
              {
                text: 'Sim',
                handler: ()=> {
                  this.criarFormulario();
                }
              },
              { text: 'Não', 
                handler: ()=>{
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
