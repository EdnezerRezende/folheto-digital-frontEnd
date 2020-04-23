import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MensagemNewDTO } from "../../models/mensagem-new.dto";
import { MensagemService } from "../../services/domain/mensagem.service";
import { MembroInfo } from "../../models/membro-info";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-mensagem-cadastrar",
  templateUrl: "mensagem-cadastrar.html",
})
export class MensagemCadastrarPage {
  item: any;
  formulario: FormGroup;
  mensagem: MensagemNewDTO = new MensagemNewDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    public mensagemService: MensagemService,
    private _alertCtrl: AlertController,
    private _localStorage: StorageService
  ) {
    this.criarFormulario();

    if (this.navParams.get("mensagem")) {
      this.mensagem = this.navParams.get("mensagem");
    }
  }

  private criarFormulario() {
    this.item = this.fb.control("");
    this.formulario = this.fb.group({
      autor: ["", Validators.required],
      titulo: ["", Validators.required],
      texto: ["", Validators.required],
    });
  }

  ionViewDidLoad() {}

  salvar(texto) {
    let membro: MembroInfo = this._localStorage.getMembro();
    this.mensagem.igrejaId = membro.igrejaId;

    if (this.mensagem.id == undefined) {
      this.mensagem.autor = this.formulario.controls.autor.value;
      this.mensagem.mensagem = this.formulario.controls.texto.value;
      this.mensagem.titulo = this.formulario.controls.titulo.value;
    }

    this.mensagemService.salvar(this.mensagem).subscribe(
      (resposta) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle:
              "A Mensagem foi adicionada com sucesso, deseja incluir Outra?",
            buttons: [
              {
                text: "Sim",
                handler: () => {
                  this.criarFormulario();
                },
              },
              {
                text: "Não",
                handler: () => {
                  this.navCtrl.setRoot("TabsPage");
                },
              },
            ],
          })
          .present();
      },
      (error) => {
        this.navCtrl.goToRoot;
      }
    );
  }
}
