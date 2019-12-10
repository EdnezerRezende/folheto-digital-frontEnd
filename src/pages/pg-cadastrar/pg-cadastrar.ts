import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EnderecoDTO } from '../../models/endereco.dto';
import { DiasSemanaEnum } from '../../enuns/dias-semana.enum';
import { DominiosService } from '../../dominios/dominios.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { PGService } from '../../services/domain/pg.service';
import { PgNewDTO } from '../../models/pg-new.dto';
import { StorageService } from '../../services/storage.service';
import { MembroInfo } from '../../models/membro-info';

@IonicPage()
@Component({
  selector: 'page-pg-cadastrar',
  templateUrl: 'pg-cadastrar.html',
})
export class PgCadastrarPage {

  formulario: FormGroup;
  pg: PgNewDTO = new PgNewDTO();
  endereco:EnderecoDTO = new EnderecoDTO();
  diasSemana:any[];
  
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    private _pgService: PGService,
    public storage:StorageService
    ) {
    this.criarFormulario();
    
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      lider: ['', Validators.required],
      responsavelCasa: ['', Validators.required],
      diaSemanaAtividade: ['', Validators.required],
      horaAtividade: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: [''],
      cep: ['', Validators.required],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]],  
      idIgreja: [1, Validators.required]
    });
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewWillEnter() {
    this.diasSemana = DominiosService.getValueDominioTodosValor(DiasSemanaEnum);
    this.obterEstados();
    
    if (this.navParams.get('item')){
      this.pg = this.navParams.get('item');
    
      this.formulario.value.estadoId = Number(this.pg.endereco.cidade.estado.id);
      setTimeout( () => {
        this.updateCidades();
        this.formulario.value.cidadeId = Number(this.pg.endereco.cidade.id);
      });
    }
  }

  private obterEstados() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formulario.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades();
      }, error => { });
  }

  updateCidades() {
    let estado_id = this.formulario.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
        this.cidades = response;
        // this.formulario.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  salvar(){
    let loading = this.obterLoading();
    loading.present();
    if ( this.pg.id == undefined ){
      this.pg.lider = this.formulario.controls.lider.value;
      this.pg.responsavelCasa = this.formulario.controls.responsavelCasa.value;
      this.pg.diaSemanaAtividade = this.formulario.controls.diaSemanaAtividade.value;
      this.pg.horaAtividade = this.formulario.controls.horaAtividade.value;
      this.pg.endereco.logradouro = this.formulario.controls.logradouro.value;
      this.pg.endereco.numero = this.formulario.controls.numero.value;
      this.pg.endereco.complemento = this.formulario.controls.complemento.value;
      this.pg.endereco.bairro = this.formulario.controls.bairro.value;
      this.pg.endereco.cep = this.formulario.controls.cep.value;
      this.pg.endereco.cidade.id = this.formulario.controls.cidadeId.value;
    }
    let membro:MembroInfo = this.storage.getMembro();

    this.pg.idIgreja = membro.igrejaId;

    this._pgService.salvar(this.pg).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O PG foi adicionado com sucesso, deseja incluir Outro?',
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

  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
}
