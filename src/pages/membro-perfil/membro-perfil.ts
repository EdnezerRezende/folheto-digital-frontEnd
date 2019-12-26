import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DominiosService } from '../../dominios/dominios.service';
import { PerfisEnum } from '../../enuns/perfis.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Membro } from '../../models/membro';
import { MembroService } from '../../services/domain/membro.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MembroAlteraPerfilDTO } from '../../models/membro-altera-perfil.dto';



@IonicPage()
@Component({
  selector: 'page-membro-perfil',
  templateUrl: 'membro-perfil.html',
})
export class MembroPerfilPage {
  membro:Membro = new Membro();
  perfil:string;
  perfisEnum:string[] = DominiosService.getValueDominioTodosValor(PerfisEnum);
  formGroup: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public formBuilder: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _membroService: MembroService,
    public alertCtrl: AlertController
    ) {
      this.criarFormulario();
  }

  ionViewDidLoad() {
    this.obterMembro();
  }

  private obterMembro() {
    if (this.navParams.get('item')) {
      let membro = this.navParams.get('item');
      this._membroService.findById(membro.id + '').subscribe(resposta => {
        this.membro = resposta;
        this.membro.perfis = DominiosService.getValueDominioPassandoKey(PerfisEnum,this.membro.perfis)
        
        this.membro.perfis.forEach(perfil => {
          let lista = this.perfisEnum.slice(0);
          let index = lista.indexOf(perfil);
          if ( index != -1 ){
            lista.splice(index, 1);
            this.perfisEnum = lista;
          }
        });
      }, error => {
        let alert = this.alertCtrl.create({
          title: "ERRO!",
          message: "Não foi possível obter dados do membro, tente novamente mais tarde!",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      });
    }
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      perfil: [null, [Validators.required]]
    });
  }
  
  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  gravar(){
    this.perfil = this.formGroup.controls.perfil.value;
    
  }

  inserePerfil(){
    let lista = DominiosService.getValueDominioTodosValor(this.perfisEnum).slice(0);
    let index = lista.indexOf(this.perfil);
    if ( index != -1 ){
      lista.splice(index, 1);
      this.perfisEnum = lista;
    }
    this.membro.perfis.push(this.perfil);
    this.membro.perfis.sort();
    this.perfil = "";
  }

  deletaPerfil(per){
    let lista = this.membro.perfis.slice(0);
    let index = lista.indexOf(per);
    if ( index != -1 ){
      lista.splice(index, 1);
      this.membro.perfis = lista;
    }
    this.perfisEnum.push(per);
    this.perfisEnum.sort();
  }

  salvarAlteracao(){
    let loading = this.obterLoading();
    loading.present();
    let membroPerfil:MembroAlteraPerfilDTO = new MembroAlteraPerfilDTO();
    membroPerfil.id = this.membro.id;
    membroPerfil.perfis = DominiosService.getKeyDominioPassandoValor(PerfisEnum,this.membro.perfis).slice(0);;
    
    this._membroService.alterarPerfil(membroPerfil).subscribe(response => {
      loading.dismiss();
      this.alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O Perfil do membro ' + this.membro.nome + ' foi alterado com sucesso!',
            buttons: [
              { text: 'Ok', 
                handler: ()=>{
                  this.perfisEnum = DominiosService.getValueDominioTodosValor(PerfisEnum);
                  this.navCtrl.pop();
                } 
              }
            ]
          })
          .present();
    },error =>{
      this.alertCtrl
          .create({
            title: 'Error',
            subTitle: 'O Perfil do membro ' + this.membro.nome + ' não foi alterado, favor tentar mais tarde!',
            buttons: [
              { text: 'Ok', 
                handler: ()=>{
                  this.perfisEnum = DominiosService.getValueDominioTodosValor(PerfisEnum);
                } 
              }
            ]
          })
          .present();
      console.log(error);
      loading.dismiss();
    });
  }
}
