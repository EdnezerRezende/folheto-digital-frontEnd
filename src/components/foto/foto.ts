import { Component, Output, EventEmitter, Input } from "@angular/core";
import { WebCamComponent } from "ack-angular-webcam";
import { CameraOptions, Camera } from "@ionic-native/camera";

@Component({
  selector: "foto",
  templateUrl: "foto.html",
})
export class FotoComponent {
  text: string;

  isHabilitaVideo: boolean = false;
  @Input()
  picture: any = "";

  captured: any = false;
  base64;
  cameraOn: boolean = false;
  facingMode: string = "enviroment";
  count = 0;

  @Output()
  sendPictureEnvio = new EventEmitter<any>();

  constructor(public camera: Camera) {}

  options: {
    video: true;
    audio: false;
    fallback: true;
    fallbackSrc: "./assets/img/jscam_canvas_only.swf";
    fallbackMode: "callback";
    fallbackQuality: 100;
  };

  habilitaCamera(webcam: WebCamComponent) {
    // webcam.startCapturingVideo();
    this.isHabilitaVideo = true;
  }
  genBase64(webcam: WebCamComponent) {
    webcam
      .getBase64()
      .then((base) => {
        this.captured = new Date();
        webcam.options.video = false;
        this.base64 = base;
        this.picture = base;
        this.isHabilitaVideo = false;
        webcam.stop();
      })
      .catch((e) => {
        this.count++;
        webcam.facingMode = this.facingMode;
        if ((this.count = 1)) {
          this.genBase64(webcam);
        } else {
          console.log("Erro");
        }
      });
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

  //CORDOVA - INICIO
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

  //Ambas Funcionalidades
  sendPicture() {
    this.sendPictureEnvio.emit(this.picture);
  }

  cancel() {
    this.picture = null;
  }
}
