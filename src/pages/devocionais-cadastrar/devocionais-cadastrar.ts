import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DevocionalDTO } from "../../models/devocional.dto";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { DevocionalService } from "../../services/domain/devocional.service";
import { StorageService } from "../../services/storage.service";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { DevocionalNewDTO } from "../../models/devocional-new.dto";
import { BibliaReferenciaService } from "../../services/domain/biblia-referencia.service";
import { LivroDTO } from "../../models/livro.dto";
import { ReferenciaDTO } from "../../models/referencia.dto";
import { VersiculoDTO } from "../../models/versiculo.dto";
import { ReferenciaNewDTO } from "../../models/referencia-new.dto";
import { AbreviacaoDTO } from "../../models/abreviacao.dto";

@IonicPage()
@Component({
  selector: "page-devocionais-cadastrar",
  templateUrl: "devocionais-cadastrar.html",
})
export class DevocionaisCadastrarPage {
  devocional: DevocionalDTO = new DevocionalDTO();
  formulario: FormGroup;

  livros: LivroDTO[] = new Array<LivroDTO>();
  capitulos: number[] = new Array<number>();
  referencia: ReferenciaDTO = new ReferenciaDTO();
  livroSelecionado: LivroDTO = new LivroDTO();
  versiculoSelecionado: any = {
    upper: 1,
    lower: 1,
  };
  versiculos: VersiculoDTO[] = new Array<VersiculoDTO>();
  isVersiculos: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private _alertCtrl: AlertController,
    private _devocionalService: DevocionalService,
    public storageService: StorageService,
    public bibliaReferencia: BibliaReferenciaService
  ) {
    this.criarFormulario();
    if (this.navParams.get("item")) {
      this.devocional = this.navParams.get("item");
    }
  }

  ionViewDidLoad() {
    this.obterLivros();
  }

  private criarFormulario() {
    this.devocional = new DevocionalDTO();
    this.devocional.textoReferencia = "";
    this.devocional.textoReferencia;
    this.formulario = this.fb.group({
      referencia: ["", Validators.required],
      livros: ["", Validators.required],
      capitulo: ["", Validators.required],
      versiculo: [""],
      descricao: ["", Validators.required],
    });
  }

  salvar() {
    let igreja: IgrejaInfoDTO = this.storageService.getIgreja();
    let dto: DevocionalNewDTO = this.converterDTO(igreja);

    this._devocionalService.salvar(dto).subscribe(
      (resposta) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle:
              "O Devocional " +
              this.devocional.textoReferencia +
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

  private converterDTO(igreja: IgrejaInfoDTO) {
    let dto: DevocionalNewDTO = new DevocionalNewDTO();
    dto.descricao = this.devocional.descricao;
    dto.id = this.devocional.id;
    dto.idIgreja = igreja.id;
    dto.isLido = this.devocional.isLido;
    let referenciaTemp: ReferenciaNewDTO = this.montarReferencia();
    dto.referencia = referenciaTemp;
    dto.textoReferencia = this.devocional.textoReferencia;
    return dto;
  }

  private montarReferencia() {
    let referenciaTemp: ReferenciaNewDTO = new ReferenciaNewDTO();
    let abre: AbreviacaoDTO = new AbreviacaoDTO();
    abre.pt = this.referencia.book.abbrev.pt;
    abre.en = this.referencia.book.abbrev.en;
    referenciaTemp.book.abbrev = abre;
    referenciaTemp.book.author = this.referencia.book.author;
    referenciaTemp.book.chapters = this.referencia.book.chapters;
    referenciaTemp.book.groupe = this.referencia.book.group;
    referenciaTemp.book.nameU = this.referencia.book.name;
    referenciaTemp.book.versionN = this.referencia.book.version;
    referenciaTemp.book.testament = this.referencia.book.testament;
    referenciaTemp.chapter = this.referencia.chapter;
    referenciaTemp.id = this.referencia.id;
    if (this.versiculos.length == 0) {
      this.inserirVersiculosEmLista();
    }
    referenciaTemp.verses = this.versiculos;
    return referenciaTemp;
  }

  obterLivros() {
    this.bibliaReferencia.obterLivros().subscribe(
      (resposta) => {
        this.livros = resposta;
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Erro",
            subTitle:
              "Não foi possível obter a lista de Livros, favor tentar mais tarde!",
            buttons: [{ text: "Ok" }],
          })
          .present();
      }
    );
  }

  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }

  totalCapitulos() {
    this.versiculos = [];
    this.isVersiculos = false;
    this.capitulos = new Array<number>();
    let totalCapitulos = this.livroSelecionado.chapters;
    for (let i = 0; i < totalCapitulos; i++) {
      this.capitulos.push(i + 1);
    }
    this.devocional.textoReferencia = this.livroSelecionado.name;
  }
  totalVersiculos() {
    this.versiculos = [];
    this.bibliaReferencia
      .obterVersiculosPorCapituloELivro(
        this.livroSelecionado.abbrev,
        this.referencia.chapter
      )
      .subscribe(
        (resposta) => {
          this.referencia = resposta;
          this.versiculoSelecionado = {
            lower: 1,
            upper: this.referencia.verses.length,
          };
          this.devocional.textoReferencia =
            this.referencia.book.name + " " + this.referencia.chapter.number;

          this.isVersiculos = true;
        },
        (error) => {
          this._alertCtrl
            .create({
              title: "Erro",
              subTitle:
                "Não foi possível obter os Versículos, favor tentar mais tarde!",
              buttons: [{ text: "Ok" }],
            })
            .present();
        }
      );
  }

  inserirVersiculo() {
    let { versInicial, versFinal } = this.inserirVersiculosEmLista();
    if (versInicial != versFinal) {
      this.devocional.textoReferencia += ":" + versInicial + "-" + versFinal;
    } else {
      this.devocional.textoReferencia += ":" + versInicial;
    }
  }

  private inserirVersiculosEmLista() {
    let versInicial = this.versiculoSelecionado.lower;
    let versFinal = this.versiculoSelecionado.upper;
    for (let i = versInicial; i <= versFinal; i++) {
      for (let j = 0; j < this.referencia.verses.length; j++) {
        if (this.referencia.verses[j].number == i) {
          this.versiculos.push(this.referencia.verses[j]);
        }
      }
    }
    return { versInicial, versFinal };
  }

  deletaVer(versiculo: VersiculoDTO) {
    let lista = this.versiculos.slice(0);
    let index = lista.indexOf(versiculo);

    if (index != -1) {
      lista.splice(index, 1);
      this.versiculos = lista;
    }

    this.devocional.textoReferencia =
      this.referencia.book.name + " " + this.referencia.chapter.number + ":";

    let versiculoAnterior: number = 0;
    let quantidadeVersiculos = this.versiculos.length;
    let count = 0;

    this.versiculos.forEach((vers) => {
      count++;
      let versAtual = vers.number;
      if (versiculoAnterior == 0 && quantidadeVersiculos != count) {
        this.devocional.textoReferencia += vers.number;
      } else if (versAtual > versiculoAnterior + 1) {
        this.devocional.textoReferencia += "-" + versiculoAnterior;
        this.devocional.textoReferencia += " ;" + versAtual;
      } else if (quantidadeVersiculos == count) {
        let ultimaPosicao = this.devocional.textoReferencia.substring(
          this.devocional.textoReferencia.length - 1,
          this.devocional.textoReferencia.length
        );
        if (
          ultimaPosicao == ":" ||
          ultimaPosicao == "-" ||
          ultimaPosicao == ";"
        ) {
          this.devocional.textoReferencia += versAtual;
        } else {
          this.devocional.textoReferencia += "-" + versAtual;
        }
      }
      versiculoAnterior = vers.number;
    });
  }
}
