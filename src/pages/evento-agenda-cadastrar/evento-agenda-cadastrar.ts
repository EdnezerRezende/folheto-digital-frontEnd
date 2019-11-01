import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgendaEventoDTO } from '../../models/agenda-evento.dto';
import { AgendaEventoService } from '../../services/domain/agenda-evento.service';
import { DominiosService } from '../../dominios/dominios.service';
import { DiasSemanaEnum } from '../../enuns/dias-semana.enum';

@IonicPage()
@Component({
  selector: 'page-evento-agenda-cadastrar',
  templateUrl: 'evento-agenda-cadastrar.html',
})
export class EventoAgendaCadastrarPage {

  formulario: FormGroup;
  agendaEvento: AgendaEventoDTO = new AgendaEventoDTO();
  diasSemana:any[];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _agendaEventoService: AgendaEventoService
    ) {
    this.criarFormulario();
    
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      diaSemanaAtividade: [''],
      horaAtividade: ['', Validators.required],
      descricao: [''],
      isEvento: [''],
      idIgreja: [1, Validators.required],
      dataInicio: [''],
      dataFim: ['']
    });
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewWillEnter() {
    this.diasSemana = DominiosService.getValueDominioTodosValor(DiasSemanaEnum);
    
    if (this.navParams.get('item')){
      this.agendaEvento = this.navParams.get('item');
    }
  }

  salvar(){
    let loading = this.obterLoading();
    loading.present();
    if ( this.agendaEvento.id == undefined ){
      this.agendaEvento.titulo = this.formulario.controls.titulo.value;
      this.agendaEvento.diaSemanaAtividade = this.formulario.controls.diaSemanaAtividade.value;
      this.agendaEvento.horaAtividade = this.formulario.controls.horaAtividade.value;
      this.agendaEvento.isEvento = this.formulario.controls.isEvento.value;
      this.agendaEvento.descricao = this.formulario.controls.descricao.value;
      this.agendaEvento.dataInicio = this.formulario.controls.dataInicio.value;
      this.agendaEvento.dataFim = this.formulario.controls.dataFim.value;
    }
    
    this.agendaEvento.idIgreja = this.formulario.controls.idIgreja.value;

    this._agendaEventoService.salvar(this.agendaEvento).subscribe(
      resposta => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: 'Sucesso',
            subTitle: 'O Evento/Agenda foi adicionado com sucesso, deseja incluir Outro?',
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
