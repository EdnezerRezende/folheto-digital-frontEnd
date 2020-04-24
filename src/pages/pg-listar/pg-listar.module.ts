import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PgListarPage } from "./pg-listar";
import { Camera } from "@ionic-native/camera";
@NgModule({
  declarations: [PgListarPage],
  imports: [IonicPageModule.forChild(PgListarPage)],
  providers: [Camera]
})
export class PgListarPageModule {}
