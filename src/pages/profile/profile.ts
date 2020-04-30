import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { API_CONFIG } from "../../config/api.config";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import { MembroService } from "../../services/domain/membro.service";
import { MembroInfo } from "../../models/membro-info";
import { WebCamComponent } from "ack-angular-webcam";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { ImageUtilService } from "../../services/image-util.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  membro: MembroInfo;
  picture: any;
  profileImage;
  cameraOn: boolean = false;
  base64;
  isHabilitaVideo: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public membroService: MembroService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public http: HttpClient,
    public imageUtilService: ImageUtilService
  ) {
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  options: {
    video: boolean | MediaTrackConstraints;
    audio: boolean;
    width: number;
    height: number;
    fallback: boolean;
    fallbackSrc: string;
    fallbackMode: string;
    fallbackQuality: number;
  };

  habilitaCamera(webcam: WebCamComponent) {
    // webcam.startCapturingVideo();
    this.isHabilitaVideo = true;
  }
  genBase64(webcam: WebCamComponent) {
    webcam
      .getBase64()
      .then((base) => {
        webcam.options.video = false;
        this.base64 = base;
        this.picture = base;
        this.isHabilitaVideo = false;
        webcam.stop();
      })
      .catch((e) => console.error(e));
  }

  genPostData(webcam: WebCamComponent) {
    webcam
      .captureAsFormData({ fileName: "file.jpg" })
      .then((formData) => this.postFormData(formData))
      .catch((e) => console.error(e));
  }
  postFormData(formData) {
    this.sendPicture();
  }

  onCamError(err) {}

  onCamSuccess() {}

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

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {
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
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {
        this.cameraOn = false;
      }
    );
  }

  sendPicture() {
    this.membroService.uploadPicture(this.picture, this.membro.id).subscribe(
      (response) => {
        this.picture = null;
        this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
        this.storage.setMembro(this.membro);
        this.getImageIfExists();
      },
      (error) => {}
    );
  }

  cancel() {
    this.picture = null;
  }
}
