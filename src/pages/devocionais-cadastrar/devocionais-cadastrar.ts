import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DevocionalDTO } from "../../models/devocional.dto";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { DevocionalService } from "../../services/domain/devocional.service";

@IonicPage()
@Component({
  selector: "page-devocionais-cadastrar",
  templateUrl: "devocionais-cadastrar.html",
})
export class DevocionaisCadastrarPage {
  devocional: DevocionalDTO = new DevocionalDTO();
  formulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private _alertCtrl: AlertController,
    private _devocionalService: DevocionalService
  ) {
    this.criarFormulario();
    if (this.navParams.get("item")) {
      this.devocional = this.navParams.get("item");
    }
  }

  ionViewDidLoad() {}

  private criarFormulario() {
    this.formulario = this.fb.group({
      referencia: ["", Validators.required],
      descricao: ["", Validators.required],
    });
  }

  salvar() {
    this.devocional.idIgreja = 1;

    this._devocionalService.salvar(this.devocional).subscribe(
      (resposta) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle:
              "O Devocional " +
              this.devocional.referencia +
              " foi adicionado com sucesso, deseja incluir Outro?",
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
