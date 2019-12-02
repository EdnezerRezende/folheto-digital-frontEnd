import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DevocionalDTO } from '../../models/devocional.dto';
import { DevocionalService } from '../../services/domain/devocional.service';
import { DevocionaisCadastrarPage } from '../devocionais-cadastrar/devocionais-cadastrar';
import { DevocionaisComentarPage } from '../devocionais-comentar/devocionais-comentar';
import { StorageService } from '../../services/storage.service';
import { Membro } from '../../models/membro';


@IonicPage()
@Component({
  selector: 'page-devocionais-listar',
  templateUrl: 'devocionais-listar.html',
})
export class DevocionaisListarPage {

  devocionais: DevocionalDTO[] = new Array<DevocionalDTO>();
  devocionaisSearch: DevocionalDTO[] = new Array<DevocionalDTO>();
  dadosMembro:Membro = new Membro();
  isPermite = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _devocionalService: DevocionalService,
    public storageComentaService:StorageService,
    public storage: StorageService
    ) {

  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewWillEnter() {
    this.dadosMembro = this.storage.getMembro();

    this.obterLista();
    
    
  }

  get perfilLogado(){
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
    let loading = this.obterLoading();
    loading.present();
    this._devocionalService.buscaTodos().subscribe(resposta => {
      loading.dismiss();
      this.devocionais = resposta;
      this.devocionaisSearch = this.devocionais;
      this.devocionais.forEach(devocional => {
        let isLido = this.storageComentaService.getReferenciaLida(devocional.id);
        devocional.isLido = isLido;
      });
    }, error => {
      loading.dismiss();
      this._alertCtrl
        .create({
          title: 'Falha',
          subTitle: 'Não foi possível obter os devocionais, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .present();
      this.navCtrl.goToRoot;
    });
  }

  copiaLista() {
    return this.devocionais;
  }
  getItems(ev: any) {
    this.devocionaisSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.devocionaisSearch = this.devocionaisSearch.filter(item => {
        return (
          item.referencia.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1
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

  deletar( item:DevocionalDTO ){
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

  deletarConfirmado(item:DevocionalDTO){
    let loading = this.obterLoading();
    loading.present();

    this._devocionalService.deletar(item.id).subscribe(() => {
      loading.dismiss();
      let lista = this.devocionais.slice(0);
      let index = lista.indexOf(item);
      if ( index != -1 ){
        lista.splice(index, 1);
        this.devocionais = lista;
        this.devocionaisSearch = this.copiaLista();
        this.storageComentaService.setRemoveReferencia(item.id);
      }
    }, error => {
      loading.dismiss();
      console.log(error);
      this._alertCtrl
        .create({
          title: 'Falha',
          subTitle: 'Não foi possível apagar esta Mensagem, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .present();
    });
  }

  alterar(item: DevocionalDTO){
    this.navCtrl.push(DevocionaisCadastrarPage.name, {item: item});
  }

  comentario( item: DevocionalDTO ){
    this.navCtrl.push(DevocionaisComentarPage.name, {item: item});
  }

  verificarLido(e, item: DevocionalDTO){
    let isChecked = e.value;
    let checkedGuard = this.storageComentaService.getReferenciaLida(item.id);
    if( checkedGuard != undefined && checkedGuard != isChecked ){
      this.storageComentaService.setReferenciaLida(item.id, isChecked);
      item.isLido=isChecked;
      return isChecked;
    }else{
      checkedGuard ? checkedGuard:this.storageComentaService.setReferenciaLida(item.id, isChecked);
      item.isLido=isChecked;
      return isChecked;
    }
  }

}
