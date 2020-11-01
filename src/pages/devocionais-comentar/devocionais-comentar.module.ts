import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DevocionaisComentarPage } from "./devocionais-comentar";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [DevocionaisComentarPage],
  imports: [
    IonicPageModule.forChild(DevocionaisComentarPage),
    ComponentsModule
  ],
})
export class DevocionaisComentarPageModule {}
