import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { API_CONFIG } from "../../config/api.config";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import { Membro } from "../../models/membro";
import { MembroService } from "../../services/domain/membro.service";
import { MembroInfo } from "../../models/membro-info";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  membro: MembroInfo;
  picture: string;
  profileImage;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public membroService: MembroService,
    public camera: Camera,
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.membroService.findByEmail(localUser.email).subscribe(
        response => {
          this.membro = response as MembroInfo;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("TabsPage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("TabsPage");
    }
  }

  getImageIfExists() {
    this.membroService.getImageFromBucket(this.membro.id + "").subscribe(
      response => {
        this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
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

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false;
      }
    );
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false;
      }
    );
  }

  sendPicture() {
    this.membroService.uploadPicture(this.picture, this.membro.id).subscribe(
      response => {
        this.picture = null;
        this.getImageIfExists();
      },
      error => {}
    );
  }

  cancel() {
    this.picture = null;
  }
}
