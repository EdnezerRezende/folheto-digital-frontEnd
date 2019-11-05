import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DevocionalDTO } from '../../models/devocional.dto';
import { StorageService } from '../../services/storage.service';
import { Comentarios } from '../../models/comentarios';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-devocionais-comentar',
  templateUrl: 'devocionais-comentar.html',
})
export class DevocionaisComentarPage {
  devocional:DevocionalDTO = new DevocionalDTO();
  comentario:Comentarios = new Comentarios();

  formulario: FormGroup;
  
  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public storageComentaService:StorageService,
      private fb: FormBuilder,
      private _loadingCtrl: LoadingController,
      private _alertCtrl: AlertController
    ) {
      this.criarFormulario();

    if (this.navParams.get('item')) {
      this.devocional = this.navParams.get('item');
      this.comentario = storageComentaService.getComentarios(this.devocional.id);
    } 
    console.log(this.comentario);
    if ( this.comentario == null ) {
      this.inicializarComentario();
    }
   }

  private inicializarComentario() {
    this.comentario = new Comentarios();
    this.comentario.referencia = this.devocional.referencia;
    this.comentario.id = this.devocional.id;
    this.criarFormulario();
  }

  ionViewDidLoad() {

  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      texto: ['', Validators.required]
    });
  }

  criar(){
    this.storageComentaService.setComentarios(this.comentario);
    this.comentario = this.storageComentaService.getComentarios(this.comentario.id);
    this._alertCtrl
      .create({
        title: 'Salvo',
        subTitle: 'Comentário salvo com sucesso',
        buttons: [
          { text: 'Ok' }
        ]
      })
      .present();
  }

  alterar(item: Comentarios){
    this.comentario = item;
  }

  deletar( item:Comentarios ){
    this._alertCtrl
      .create({
        title: 'Excluir',
        subTitle: 'Este Item será deletado, deseja continuar?',
        buttons: [
          {
            text: 'Sim',
            handler: ()=> {
              this.deletarConfirmado(item);
            }
          },
          { text: 'Não'
          }
        ]
      })
      .present();
  }

  deletarConfirmado(item:Comentarios){
    this.storageComentaService.setRemoveComentarios(item);
    this.inicializarComentario();
  }
}
