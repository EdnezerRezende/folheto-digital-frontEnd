import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { DevocionalDTO } from "../../models/devocional.dto";
import { StorageService } from "../../services/storage.service";
import { ComentarioDTO } from "../../models/comentarios";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DevocionalComentarioService } from "../../services/domain/devocional.comentario.service";
import { MembroInfo } from "../../models/membro-info";
import { DevocionalComentarioNewDTO } from "../../models/devocional-comentario-new.dto";

@IonicPage()
@Component({
  selector: "page-devocionais-comentar",
  templateUrl: "devocionais-comentar.html",
})
export class DevocionaisComentarPage {
  devocional: DevocionalDTO = new DevocionalDTO();
  comentario: ComentarioDTO = new ComentarioDTO();

  formulario: FormGroup;
  membro: MembroInfo = new MembroInfo();
  
  perfilVisitante = this.storageComentaService.temPerfilVisitante();
  
  fonteMaior = 1;
  fonteMenor = 1;
  tamanhoFonte = 20;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageComentaService: StorageService,
    public devocionalComentarioService: DevocionalComentarioService,
    private fb: FormBuilder,
    private _alertCtrl: AlertController
  ) {
    if (this.navParams.get("item")) {
      this.devocional = this.navParams.get("item");
      this.inicializarComentario();
      this.membro = this.storageComentaService.getMembro();
      this.devocionalComentarioService
        .buscarPorReferenciaEMembro(
          this.membro.id,
          this.devocional.referencia.id
        )
        .subscribe(
          (resposta) => {
            if (resposta != undefined && resposta.id != undefined) {
              this.comentario = resposta;
            }
          },
          (error) => {
            this._alertCtrl
              .create({
                title: "Comentário",
                subTitle:
                  "Não foi possível obter comentário, favor tentar mais tarde!",
                buttons: [{ text: "Ok" }],
              })
              .present();
          }
        );
    }
  }

  private inicializarComentario() {
    this.comentario = new ComentarioDTO();
    this.comentario.referencia = this.devocional.referencia.id;
    this.comentario.id = this.devocional.id;
    this.criarFormulario();
  }

  ionViewDidLoad() {}

  fonteDiminuir() {
    this.tamanhoFonte -= this.fonteMenor;
  }
  fonteAumentar() {
    this.tamanhoFonte += this.fonteMaior;
  }
  private criarFormulario() {
    this.formulario = this.fb.group({
      chamouAtencao: [""],
      sobreDeus: [""],
      sobreHumanidade: [""],
      oQueAprendi: [""],
    });
  }

  criar() {
    this.comentario.referencia = this.devocional.referencia.id;
    let comentarioDTO: DevocionalComentarioNewDTO = new DevocionalComentarioNewDTO();
    comentarioDTO.id = this.comentario.id;
    comentarioDTO.chamouAtencao = this.comentario.chamouAtencao;
    comentarioDTO.idMembro = this.membro.id;
    comentarioDTO.oQueAprendi = this.comentario.oQueAprendi;
    comentarioDTO.referencia = this.comentario.referencia;
    comentarioDTO.sobreDeus = this.comentario.sobreDeus;
    comentarioDTO.sobreHumanidade = this.comentario.sobreHumanidade;

    this.devocionalComentarioService.salvar(comentarioDTO).subscribe(
      (resposta) => {
        this._alertCtrl
          .create({
            title: "Salvo",
            subTitle: "Comentário salvo com sucesso",
            buttons: [{ text: "Ok" }],
          })
          .present();
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Error",
            subTitle: "Comentário não foi salvo, tente novamente mais tarde!",
            buttons: [{ text: "Ok" }],
          })
          .present();
      }
    );
  }

  alterar(item: ComentarioDTO) {
    this.comentario = item;
  }

  deletar(item: ComentarioDTO) {
    this._alertCtrl
      .create({
        title: "Excluir",
        subTitle: "Este Item será deletado, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarConfirmado(item);
            },
          },
          { text: "Não" },
        ],
      })
      .present();
  }

  deletarConfirmado(item: ComentarioDTO) {
    this.devocionalComentarioService.deletar(item.id).subscribe(
      (resposta) => {
        this.inicializarComentario();
      },
      (error) => {
        this._alertCtrl.create({
          title: "Falha",
          subTitle:
            "Não foi possível excluir o comentário, tente novamente mais tarde!",
          buttons: [
            {
              text: "Ok",
            },
          ],
        });
      }
    );
  }

  copiarTexto(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
