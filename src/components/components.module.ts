import { NgModule } from "@angular/core";
import { FotoComponent } from "./foto/foto";
import { IonicModule } from "ionic-angular";
import { WebCamModule } from "ack-angular-webcam";
import { Camera } from "@ionic-native/camera";
import { VersiculosComponent } from './versiculos/versiculos';

@NgModule({
  declarations: [FotoComponent,
    VersiculosComponent],
  imports: [IonicModule, WebCamModule],
  exports: [FotoComponent,
    VersiculosComponent],
  providers: [Camera],
})
export class ComponentsModule {}
