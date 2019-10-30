import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PgDTO } from '../../models/pg.dto';
import { DiasSemanaEnum } from '../../enuns/dias-semana.enum';
import { DominiosService } from '../../dominios/dominios.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';

@IonicPage()
@Component({
  selector: 'page-pg-cadastrar',
  templateUrl: 'pg-cadastrar.html',
})
export class PgCadastrarPage {

  formulario: FormGroup;
  pg: PgDTO = new PgDTO();
  endereco:EnderecoDTO = new EnderecoDTO();
  diasSemana:any[];
  
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public estadoService: EstadoService,
    public cidadeService: CidadeService
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

  ionViewDidLoad() {
    this.diasSemana = DominiosService.getValueDominioTodosValor(DiasSemanaEnum);
    this.obterEstados();
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
        this.formulario.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  salvar(){
    console.log("Vai salvar");
  }

  
  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
}
