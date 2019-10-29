import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PgDTO } from '../../models/pg.dto';
import { DiasSemanaEnum } from '../../enuns/dias-semana.enum';
import { DominiosService } from '../../dominios/dominios.service';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
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
      idCidade: ['', Validators.required],
      idIgreja: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.diasSemana = DominiosService.getValueDominioTodosValor(DiasSemanaEnum);
    console.log('ionViewDidLoad PgCadastrarPage');
  }

  salvar(){
    console.log("Vai salvar");
  }

  
  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
}
