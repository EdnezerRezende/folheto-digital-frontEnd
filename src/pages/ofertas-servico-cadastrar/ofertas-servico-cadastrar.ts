import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OfertaServicoNewDTO } from "../../models/ofertaServico-new.dto";
import { OfertaServicoService } from "../../services/domain/oferta-servico.service";
import { StorageService } from "../../services/storage.service";
import { MembroInfo } from "../../models/membro-info";
import { BrMaskerIonicServices3, BrMaskModel } from "brmasker-ionic-3";

@IonicPage()
@Component({
  selector: "page-ofertas-servico-cadastrar",
  templateUrl: "ofertas-servico-cadastrar.html",
})
export class OfertasServicoCadastrarPage {
  item: any;
  formulario: FormGroup;
  servico: OfertaServicoNewDTO = new OfertaServicoNewDTO();
  telefone: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private _alertCtrl: AlertController,
    private _ofertaService: OfertaServicoService,
    private _localStorage: StorageService,
    private brMasker: BrMaskerIonicServices3
  ) {
    this.criarFormulario();
    if (this.navParams.get("item")) {
      this.servico = this.navParams.get("item");
      let tels: string[] = new Array<string>();
      this.servico.telefones.forEach((tel) => {
        tels.push(this.mascaraTelefone(tel));
      });
      this.servico.telefones = tels;
    }
  }

  private mascaraTelefone(tel: string): string {
    let config: BrMaskModel = new BrMaskModel();
    config.phone = true;
    return this.brMasker.writeCreateValue(tel, config);
  }

  private retiraMascaraTelefone(tel: string): string {
    tel = tel
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");
    return tel;
  }

  ionViewDidLoad() {}

  private criarFormulario() {
    this.item = this.fb.control("");
    this.formulario = this.fb.group({
      nome: ["", Validators.required],
      descricao: ["", Validators.required],
      telefone: [""],
      instagram: [""],
      facebook: [""],
      emailServico: [""],
      endereco: [""],
    });
  }

  insereTel() {
    this.servico.telefones.push(this.telefone);
    this.telefone = "";
  }

  deletaTel(tel: string) {
    let lista = this.servico.telefones.slice(0);
    let index = lista.indexOf(tel);
    if (index != -1) {
      lista.splice(index, 1);
      this.servico.telefones = lista;
    }
  }

  salvar() {
    let tels: string[] = new Array<string>();
    this.servico.telefones.forEach((tel) => {
      tels.push(this.retiraMascaraTelefone(tel));
    });
    this.servico.telefones = tels;
    console.log(tels);
    let membro: MembroInfo = this._localStorage.getMembro();
    this.servico.idIgreja = membro.igrejaId;
    this._ofertaService.salvar(this.servico).subscribe(
      (resposta) => {
        if (this.servico.id == undefined) {
          this._alertCtrl
            .create({
              title: "Sucesso",
              subTitle:
                "O serviço foi adicionada com sucesso, deseja incluir Outro?",
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
        } else {
          this._alertCtrl
            .create({
              title: "Sucesso",
              subTitle: "O serviço foi alterado com sucesso",
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.navCtrl.pop();
                  },
                },
              ],
            })
            .present();
        }
      },
      (error) => {
        this.navCtrl.goToRoot;
      }
    );
  }
}
