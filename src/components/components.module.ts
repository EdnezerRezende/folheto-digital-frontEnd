import { NgModule } from "@angular/core";
import { FotoComponent } from "./foto/foto";
import { IonicModule } from "ionic-angular";
import { WebCamModule } from "ack-angular-webcam";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [FotoComponent],
  imports: [IonicModule, WebCamModule],
  exports: [FotoComponent],
  providers: [Camera],
})
export class ComponentsModule {}
