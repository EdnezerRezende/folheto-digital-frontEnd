import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagemNewDTO } from '../../models/mensagem-new.dto';
import { MensagemService } from '../../services/domain/mensagem.service';

@IonicPage()
@Component({
  selector: 'page-mensagem-cadastrar',
  templateUrl: 'mensagem-cadastrar.html',
})
export class MensagemCadastrarPage {
  item:any;
  formulario: FormGroup;
  mensagem: MensagemNewDTO = new MensagemNewDTO();

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, 
    public mensagemService: MensagemService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
    ) {
    this.criarFormulario();
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
    loading.present();

    this.mensagem.autor = this.formulario.controls.autor.value;
    this.mensagem.mensagem = this.formulario.controls.texto.value;
    this.mensagem.titulo = this.formulario.controls.titulo.value;

    this.mensagemService.salvar(this.mensagem).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'A Mensagem foi adicionada com sucesso, deseja incluir Outra?',
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
