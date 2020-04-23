import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StorageService } from "../../services/storage.service";
import { MembroInfo } from "../../models/membro-info";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { ContatoDTO } from "../../models/contato.dto";
import { EmailService } from "../../services/domain/email.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {
  formGroup: FormGroup;
  mostrarMap: boolean = false;
  membro: MembroInfo = new MembroInfo();
  igreja: IgrejaInfoDTO = new IgrejaInfoDTO();

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: StorageService,
    private _alertCtrl: AlertController,
    private _emailService: EmailService
  ) {
    this.membro = this.storage.getMembro();
    this.criarFormulario();
  }

  ionViewWillEnter() {}

  get obterDadosIgreja(): IgrejaInfoDTO {
    this.igreja = this.storage.getIgreja();
    return this.igreja;
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: [
        this.membro.nome,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      email: [this.membro.email, [Validators.required, Validators.email]],
      telefone: [this.membro.telefone1, [Validators.required]],
      assunto: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      mensagem: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  enviarEmail() {
    let contato: ContatoDTO = new ContatoDTO();
    contato.to = this.igreja.email;
    contato.email = this.membro.email;
    contato.assunto = this.formGroup.value.assunto;
    contato.mensagem = this.formGroup.value.mensagem;
    contato.nome = this.membro.nome;
    contato.telefone = this.formGroup.value.telefone;

    this._emailService.enviarContato(contato).subscribe(
      (response) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle: "O E-mail foi enviado com sucesso, aguarde contato!",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.navCtrl.setRoot("TabsPage");
                },
              },
            ],
          })
          .present();
      },
      (erro) => {}
    );
  }

  visualizarMap() {
    this.mostrarMap = !this.mostrarMap;
  }
}
