import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Membro } from '../../models/membro';
import { BrMaskerIonicServices3, BrMaskModel, BrMaskServicesModel } from 'brmasker-ionic-3';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MembroService } from '../../services/domain/membro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { DominiosService } from '../../dominios/dominios.service';
import { MembroAlteraDadosDTO } from '../../models/membro-altera-dados.dto';


@IonicPage()
@Component({
  selector: 'page-membro-alterar',
  templateUrl: 'membro-alterar.html',
})
export class MembroAlterarPage {
  membro:Membro = new Membro();
  membroAlterar:MembroAlteraDadosDTO = new MembroAlteraDadosDTO();
  endereco:EnderecoDTO = new EnderecoDTO();
  telefone:string;
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  cidade:CidadeDTO;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private brMasker: BrMaskerIonicServices3,
      private _loadingCtrl: LoadingController,
      private _membroService: MembroService,
      public alertCtrl: AlertController,
      public formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public estadoService: EstadoService
    ) {
    this.criarFormulario();
    
  }

  private obterMembro() {
    if (this.navParams.get('item')) {
      let membro = this.navParams.get('item');
      this._membroService.findById(membro.id + '').subscribe(resposta => {
        this.membro = resposta;
        this.endereco = this.membro.enderecos[0];
        let tels: string[] = new Array<string>();
        this.membro.telefones.forEach(tel => {
          tels.push(this.mascaraTelefone(tel));
        });
        this.membro.telefones = tels;
        this.membro.enderecos[0].cep = this.mascaraCep(this.membro.enderecos[0].cep);

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
      email: ["", [Validators.required, Validators.email]],
      logradouro: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: ["", []],
      bairro: ["", []],
      telefone: ["", []],
      telefones: ["", []],
      cep: ["", [Validators.required]],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.obterEstados();
    this.obterMembro();
  }

  private mascaraTelefone(tel:string):string {
    let config: BrMaskModel = new BrMaskModel();
    config.phone = true;
    return this.brMasker.writeCreateValue(tel, config);
  }

  private retiraMascaraTelefone(tel:string):string {
    tel = tel.replace('(','').replace(')', '').replace('-','').replace(' ', '');
    return tel;
  }

  private mascaraCep(cep:string):string {
    let config: BrMaskServicesModel = new BrMaskServicesModel();
    config.mask = "00.000-000";
    return this.brMasker.writeCreateValue(cep, config);
  }

  private retiraMascaraCep(cep:string):string {
    cep = cep.replace('.','').replace('-','');
    return cep;
  }


  insereTel(){
    this.membro.telefones.push(this.telefone);
    this.telefone = "";
  }

  deletaTel(tel:string){
    let lista = this.membro.telefones.slice(0);
    let index = lista.indexOf(tel);
    if ( index != -1 ){
      lista.splice(index, 1);
      this.membro.telefones = lista;
    }
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  alterar(){
    let loading = this.obterLoading();
    loading.present();

    this.gerarDtoEnvio(this.membroAlterar);

    this._membroService.alterarDados(this.membroAlterar, this.membro.id).subscribe(response => {
      loading.dismiss();
      this.alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O Perfil do membro ' + this.membro.nome + ' foi alterado com sucesso!',
            buttons: [
              { text: 'Ok', 
                handler: ()=>{
                  this.navCtrl.pop();
                } 
              }
            ]
          })
          .present();
          
    }, error => {
      this.alertCtrl
          .create({
            title: 'Error',
            subTitle: 'O Perfil do membro ' + this.membro.nome + ' não foi alterado, favor tentar mais tarde!',
            buttons: [
              { text: 'Ok', 
                handler: ()=>{
                  this.navCtrl.pop();
                } 
              }
            ]
          })
          .present();
      loading.dismiss();
    });
  }


  private gerarDtoEnvio(membroAlterar: MembroAlteraDadosDTO) {
    this.endereco.cep = this.retiraMascaraCep(this.endereco.cep.slice(0));
    this.retirarFormatacaoTelefone();
    membroAlterar.email = this.membro.email;
    let endereco:EnderecoDTO[] = new Array<EnderecoDTO>();
    this.cidade = this.formGroup.value.cidadeId;
    this.cidade.estado = new EstadoDTO();
    this.cidade.estado.id = this.formGroup.value.estadoId;
    this.endereco.cidade = this.cidade;
    endereco.push(this.endereco);
    membroAlterar.enderecos = endereco;
    membroAlterar.telefones = this.membro.telefones;
  }

  private retirarFormatacaoTelefone() {
    let tels: string[] = new Array<string>();
    this.membro.telefones.forEach(tel => {
      tels.push(this.retiraMascaraTelefone(tel));
    });
    this.membro.telefones = tels;
  }

  private obterEstados() {
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {}
    );
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {}
    );
  }

  compareFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
