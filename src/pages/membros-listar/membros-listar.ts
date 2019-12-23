import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Membro } from "../../models/membro";
import { ImageViewerController } from "ionic-img-viewer";
import { MembroService } from "../../services/domain/membro.service";
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from "../../services/storage.service";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: "page-membros-listar",
  templateUrl: "membros-listar.html"
})
export class MembrosListarPage {
  membros: Membro[] = new Array<Membro>();
  membrosSearch: Membro[] = new Array<Membro>();
  picture: string;
  profileImage;

  _imageViewerCtrl: ImageViewerController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _membroService: MembroService,
    public sanitizer: DomSanitizer,
    imageViewerCtrl: ImageViewerController,
    public storage: StorageService
  ) {
    this._imageViewerCtrl = imageViewerCtrl;
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando..."
    });
  }

  ionViewDidLoad() {
    this.obterLista();
  }

  get perfilLogado() {
    return this.storage.temPerfilAdminLider();
  }

  private obterLista() {
    let loading = this.obterLoading();
    loading.present();
    let igreja: IgrejaInfoDTO = this.storage.getIgreja();
    this._membroService.buscaTodosPorIgreja(igreja.id).subscribe(
      resposta => {
        loading.dismiss();
        this.membros = resposta;
        this.loadImageUrls();
        this.membrosSearch = this.membros;
      },
      error => {
        loading.dismiss();
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível obter os Membros, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok"
              }
            ]
          })
          .present();
        this.navCtrl.goToRoot;
      }
    );
  }

  loadImageUrls() {
    this.membros.forEach(item => {
      this._membroService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${item.id}.jpg`;
        },
        error => {}
      );
    });
  }

  sendPicture(item: Membro) {
    this._membroService.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.getImageIfExists(item);
      },
      error => {}
    );
  }

  getImageIfExists(item: Membro) {
    this._membroService.getImageFromBucket(item.id + "").subscribe(
      response => {
        this.membros[0].imageUrl = `${API_CONFIG.bucketBaseUrl}/Pg${item.id}.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          item.imageUrl = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
      error => {
        this.profileImage = "assets/imgs/avatar-blank.png";
      }
    );
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  copiaLista() {
    return this.membros;
  }
  getItems(ev: any) {
    this.membrosSearch = this.copiaLista();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.membrosSearch = this.membrosSearch.filter(item => {
        return (
          item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.email.toLowerCase().indexOf(val.toLowerCase()) > -1
          // item.dataNascimento.toLowerCase().indexOf(val.toLowerCase()) > -1
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

  deletar(item: Membro) {
    this._alertCtrl
      .create({
        title: "Deletar",
        subTitle: "Este Item será deletado, deseja continuar?",
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.deletarConfirmado(item);
            }
          },
          { text: "Não" }
        ]
      })
      .present();
  }

  deletarConfirmado(item: Membro) {
    let loading = this.obterLoading();
    loading.present();

    this._membroService.deletar(item.id).subscribe(
      () => {
        loading.dismiss();
        let lista = this.membros.slice(0);
        let index = lista.indexOf(item);
        if (index != -1) {
          lista.splice(index, 1);
          this.membros = lista;
          this.membrosSearch = this.copiaLista();
        }
      },
      error => {
        loading.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha",
            subTitle:
              "Não foi possível apagar este Membro, tente novamente mais tarde!",
            buttons: [
              {
                text: "Ok"
              }
            ]
          })
          .present();
      }
    );
  }

  alterar(item: Membro) {
    this.navCtrl.push("SignupPage", { item: item });
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
}
