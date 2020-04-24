import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ItemSliding,
} from "ionic-angular";
import { PgDTO } from "../../models/pg.dto";
import { PGService } from "../../services/domain/pg.service";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageViewerController } from "ionic-img-viewer";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-pg-listar",
  templateUrl: "pg-listar.html",
})
export class PgListarPage {
  pgs: PgDTO[] = new Array<PgDTO>();
  pgsSearch: PgDTO[] = new Array<PgDTO>();
  picture: string;
  profileImage;

  _imageViewerCtrl: ImageViewerController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _pgService: PGService,
    public sanitizer: DomSanitizer,
    imageViewerCtrl: ImageViewerController,
    public storage: StorageService
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  ionViewDidLoad() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
    this._pgService.buscaTodos().subscribe(
      (resposta) => {
        this.pgs = resposta;
        this.loadImageUrls();
        this.pgsSearch = this.pgs;
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter os PG´s, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok",
              },
            ],
          })
          .present();
        this.navCtrl.goToRoot;
      }
    );
  }

  loadImageUrls() {
    this.pgs.forEach((item) => {
      this._pgService.getSmallImageFromBucket(item.id).subscribe(
        (response) => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/Pg${item.id}.jpg`;
        },
        (error) => {}
      );
    });
  }

  sendPicture(item: PgDTO) {
    this._pgService.uploadPicture(this.picture, item.id).subscribe(
      (response) => {
        this.picture = null;
        this.getImageIfExists(item);
      },
      (error) => {}
    );
  }

  getImageIfExists(item: PgDTO) {
    this._pgService.getImageFromBucket(item.id).subscribe(
      (response) => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/Pg${item.id}.jpg`;
        this.blobToDataURL(response).then((dataUrl) => {
          let str: string = dataUrl as string;
          item.imageUrl = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
      (error) => {
        this.profileImage = "assets/imgs/avatar-blank.png";
      }
    );
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  copiaLista() {
    return this.pgs;
  }
  getItems(ev: any) {
    this.pgsSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.pgsSearch = this.pgsSearch.filter((item) => {
        return (
          item.lider.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.responsavelCasa.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.endereco.cidade.nome.toLowerCase().indexOf(val.toLowerCase()) >
            -1 ||
          item.diaSemanaAtividade.toLowerCase().indexOf(val.toLowerCase()) >
            -1 ||
          item.horaAtividade.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  doRefresh(refresher) {
    this.obterLista();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  deletar(item: PgDTO, slidingItem: ItemSliding) {
    this._alertCtrl
      .create({
        title: "Salvar",
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
    slidingItem.close();
  }

  deletarConfirmado(item: PgDTO) {
    this._pgService.deletar(item.id).subscribe(
      () => {
        let lista = this.pgs.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.pgs = lista;
          this.pgsSearch = this.copiaLista();
        }
      },
      (error) => {
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar esta Mensagem, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok",
              },
            ],
          })
          .present();
      }
    );
  }

  alterar(item: PgDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("PgCadastrarPage", { item: item });
    slidingItem.close();
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  detalhar(item: PgDTO, slidingItem: ItemSliding) {
    this.navCtrl.push("PgDetalharPage", { item: item });
    slidingItem.close();
  }
}
