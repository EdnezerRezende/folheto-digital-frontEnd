import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AniversarianteNewDTO } from "../../models/aniversariante-new.dto";
import { AniversarianteService } from "../../services/domain/aniversariante.service";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { StorageService } from "../../services/storage.service";
import { AniversarianteInfoDTO } from "../../models/aniversariante-info.dto";
import { AniversarianteAlteraDTO } from "../../models/aniversariante-altera.dto";

@IonicPage()
@Component({
  selector: "page-aniversariante-cadastrar",
  templateUrl: "aniversariante-cadastrar.html",
})
export class AniversarianteCadastrarPage {
  formGroup: FormGroup;
  aniversariante: AniversarianteNewDTO = new AniversarianteNewDTO();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private localStorage: StorageService,
    private _aniversarianteService: AniversarianteService
  ) {
    this.criarFormulario();
    if (this.navParams.get("item")) {
      let niver: AniversarianteInfoDTO = this.navParams.get("item");
      this.aniversariante.dataNascimento = niver.dataNascimento;
      this.aniversariante.email = niver.email;
      this.aniversariante.id = niver.id;
      this.aniversariante.nome = niver.nome;
    }
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      dataNascimento: [null, [Validators.required]],
    });
  }
  ionViewDidLoad() {}

  cadastrar() {
    let loading = this.obterLoading();
    loading.present();
    let igreja: IgrejaInfoDTO = this.localStorage.getIgreja();

    this.aniversariante.idIgreja = igreja.id;
    if (this.aniversariante.id) {
      let niver: AniversarianteAlteraDTO = new AniversarianteAlteraDTO();
      niver.dataNascimento = this.aniversariante.dataNascimento;
      niver.email = this.aniversariante.email;
      niver.nome = this.aniversariante.nome;

      this._aniversarianteService
        .alterarDados(niver, this.aniversariante.id)
        .subscribe((resposta) => {});
    } else {
      this._aniversarianteService.insert(this.aniversariante).subscribe(
        (resposta) => {
          this.sucesso(loading);
        },
        (error) => {
          loading.dismiss();
          this.error();
        }
      );
    }
  }

  private error() {
    if (this.aniversariante.id) {
      this.alertCtrl
        .create({
          title: "Falha",
          subTitle:
            "Não foi possível alterar o aniversariante " +
            this.aniversariante.nome +
            " , tente novamente mais tarde!",
          buttons: [
            {
              text: "Ok",
            },
          ],
        })
        .present();
    } else {
      this.alertCtrl
        .create({
          title: "Falha",
          subTitle:
            "Não foi possível cadastrar o aniversariante " +
            this.aniversariante.nome +
            " , tente novamente mais tarde!",
          buttons: [
            {
              text: "Ok",
            },
          ],
        })
        .present();
    }
  }

  private sucesso(loading) {
    loading.dismiss();
    if (this.aniversariante.id) {
      this.alertCtrl
        .create({
          title: "Sucesso",
          subTitle:
            "O Aniversariante " +
            this.aniversariante.nome.toUpperCase +
            " foi alterado com sucesso!",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.navCtrl.setRoot("TabsPage");
              },
            },
          ],
        })
        .present();
    } else {
      this.alertCtrl
        .create({
          title: "Sucesso",
          subTitle:
            "O Aniversariante " +
            this.aniversariante.nome.toUpperCase +
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
    }
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando...",
    });
  }
}
