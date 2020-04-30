import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PgDTO } from "../../models/pg.dto";
import { StorageService } from "../../services/storage.service";
import { PGService } from "../../services/domain/pg.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import { API_CONFIG } from "../../config/api.config";
import { ImageViewerController } from "ionic-img-viewer";
//Camera NPM
import { WebCamComponent } from "ack-angular-webcam";

@IonicPage()
@Component({
  selector: "page-pg-detalhar",
  templateUrl: "pg-detalhar.html",
})
export class PgDetalharPage {
  pg: PgDTO;
  picture: string;
  profileImage: any = "assets/imgs/avatar-blank.png";
  cameraOn: boolean = false;
  _imageViewerCtrl: ImageViewerController;
  isLider: boolean = false;

  //Camera NPM
  isHabilitaVideo: boolean = false;
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
  //Camera NPM

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public pgService: PGService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    imageViewerCtrl: ImageViewerController
  ) {
    this.obterPG();
    this._imageViewerCtrl = imageViewerCtrl;
    this.isLider = this.storage.temPerfilAdminLider();
  }

  ionViewDidLoad() {}

  //Camera NPM
  onCamError(err) {}

  onCamSuccess() {}

  habilitaCamera(webcam: WebCamComponent) {
    // webcam.startCapturingVideo();
    this.isHabilitaVideo = true;
  }
  genBase64(webcam: WebCamComponent) {
    webcam
      .getBase64()
      .then((base) => {
        webcam.options.video = false;
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
  //Camera NPM

  private obterPG() {
    if (this.navParams.get("item")) {
      this.pg = this.navParams.get("item");
      this.pgService.getSmallImageFromBucket(this.pg.id).subscribe(
        (response) => {
          this.profileImage = `${API_CONFIG.bucketBaseUrl}/Pg${this.pg.id}.jpg`;
        },
        (error) => {}
      );
    }
  }

  getImageIfExists() {
    this.pgService.getImageFromBucket(this.pg.id).subscribe(
      (response) => {
        this.pg.imageUrl = `${API_CONFIG.bucketBaseUrl}/Pg${this.pg.id}.jpg`;
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
        this.picture = "data:image/jpg;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {
        this.cameraOn = false;
      }
    );
  }

  sendPicture() {
    this.pgService.uploadPicture(this.picture, this.pg.id).subscribe(
      (response) => {
        this.picture = null;
        setTimeout(() => {
          this.getImageIfExists();
        }, 10000);
      },
      (error) => {}
    );
  }

  cancel() {
    this.picture = null;
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
}
