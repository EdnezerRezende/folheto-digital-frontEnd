import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissaoNewDTO } from '../../models/missao-new.dto';
import { MissaoService } from '../../services/domain/missao.service';
import { StorageService } from '../../services/storage.service';
import { MembroInfo } from '../../models/membro-info';

@IonicPage()
@Component({
  selector: 'page-missao-cadastrar',
  templateUrl: 'missao-cadastrar.html',
})
export class MissaoCadastrarPage {

  item:any;
  formulario: FormGroup;
  missao: MissaoNewDTO = new MissaoNewDTO();

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, 
    public missaoService: MissaoService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _localStorage: StorageService
    ) {
    this.criarFormulario();

    if (this.navParams.get('missao')){
      this.missao = this.navParams.get('missao');
    }
  }

  private criarFormulario() {
    this.item = this.fb.control('');
    this.formulario = this.fb.group({
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
      texto: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvar(texto){
    let loading = this.obterLoading();
    let membro: MembroInfo = this._localStorage.getMembro();
    this.missao.igrejaId = membro.igrejaId;
    
    loading.present();
    if ( this.missao.id == undefined ){
      this.missao.autor = this.formulario.controls.autor.value;
      this.missao.mensagem = this.formulario.controls.texto.value;
      this.missao.titulo = this.formulario.controls.titulo.value;
    }

    this.missaoService.salvar(this.missao).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'A Missão foi adicionada com sucesso, deseja incluir Outra?',
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
