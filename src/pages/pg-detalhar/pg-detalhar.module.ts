import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PgDetalharPage } from "./pg-detalhar";
import { Camera } from "@ionic-native/camera";
import { WebCamModule } from "ack-angular-webcam";

@NgModule({
  declarations: [PgDetalharPage],
  imports: [IonicPageModule.forChild(PgDetalharPage), WebCamModule],
  providers: [Camera],
})
export class PgDetalharPageModule {}
