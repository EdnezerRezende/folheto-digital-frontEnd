import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController
} from "ionic-angular";
import { NgModel, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MembroService } from "../../services/domain/membro.service";
import { EstadoDTO } from "../../models/estado.dto";
import { CidadeDTO } from "../../models/cidade.dto";
import { CidadeService } from "../../services/domain/cidade.service";
import { EstadoService } from "../../services/domain/estado.service";
import { MembroNewDTO } from "../../models/membro-new.dto";
import { IgrejaService } from "../../services/domain/igreja.service";
import { IgrejaDTO } from "../../models/igreja.dto";
import { Membro } from "../../models/membro";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  igrejas: IgrejaDTO[];
  membro: MembroNewDTO = new MembroNewDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public igrejaService: IgrejaService,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public membroService: MembroService,
    public alertCtrl: AlertController
  ) {
    this.criarFormulario();
    if (this.navParams.get("item")) {
      this.membro = this.navParams.get("item");
      this.membroService.findById(this.membro.id + "").subscribe(
        response => {
          let membro: Membro = response;
          this.membro.cpf = membro.cpf;
          this.membro.dataNascimento = membro.dataNascimento;
          this.membro.email = membro.email;
          this.membro.id = membro.id;
          this.membro.nome = membro.nome;
          this.membro.perfis = membro.perfis;
          this.membro.senha = membro.senha;
          this.membro.telefones = membro.telefones;
          this.membro.logradouro = membro.enderecos[0].logradouro;
          this.membro.numero = membro.enderecos[0].numero;
          this.membro.complemento = membro.enderecos[0].complemento;
          this.membro.bairro = membro.enderecos[0].bairro;
          this.membro.cep = membro.enderecos[0].cep;
          this.membro.cidadeId = Number(membro.enderecos[0].cidade.id);
        },
        error => {
          let alert = this.alertCtrl.create({
            title: "ERRO!",
            message:
              "Não foi possível obter o membro, tente novamente mais tarde!",
            enableBackdropDismiss: false,
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
        }
      );
    }
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      cpf: [
        " ",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ]
      ],
      senha: ["", [Validators.required]],
      logradouro: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: ["", []],
      bairro: ["", []],
      cep: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      celular: ["", []],
      igrejaId: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.obterIgreja();

    this.obterEstados();
  }

  obterIgreja() {
    this.igrejaService.obterTodasIgrejas().subscribe(
      response => {
        this.igrejas = response;
      },
      error => {
        let alert = this.alertCtrl.create({
          title: "ERRO!",
          message:
            "Não foi possível obter igrejas para cadastrar o membro, tente novamente mais tarde!",
          enableBackdropDismiss: false,
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
      }
    );
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

  signupUser() {
    this.membroService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => {}
    );
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
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
  }
}
