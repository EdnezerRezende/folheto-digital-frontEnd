import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";
import { MembroService } from "../../services/domain/membro.service";
import { MembroInfo } from "../../models/membro-info";
import { ImageUtilService } from "../../services/image-util.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  membro: MembroInfo;
  profileImage;
  retorno: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public membroService: MembroService,

    public sanitizer: DomSanitizer,
    public imageUtilService: ImageUtilService
  ) {
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    let usuario = this.storage.getMembro();
    if (localUser && localUser.email && usuario == undefined) {
      this.membroService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.membro = response as MembroInfo;
          setTimeout(() => {
            this.getImageIfExists();
          }, 10000);
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot("TabsPage");
          }
        }
      );
    } else if (usuario && usuario.email) {
      this.membro = usuario;
      this.profileImage = this.membro.imageUrl;
    } else {
      this.navCtrl.setRoot("TabsPage");
    }
  }

  getImageIfExists() {
    this.membroService.getImageFromBucket(this.membro.id + "").subscribe(
      (response) => {
        this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
        this.blobToDataURL(response).then((dataUrl) => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
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

  sendPicture(picture) {
    this.membroService.uploadPicture(picture, this.membro.id).subscribe(
      (response) => {
        this.retorno = null;
        this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
        this.storage.setMembro(this.membro);
        setTimeout(() => {
          this.getImageIfExists();
        }, 5000);
      },
      (error) => {
        this.retorno = "Ocorreu um Erro no Envio, tentar novamente mais tarde!";
      }
    );
  }
}
