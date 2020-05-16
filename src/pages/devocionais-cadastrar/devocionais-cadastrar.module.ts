import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DevocionaisCadastrarPage } from "./devocionais-cadastrar";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [DevocionaisCadastrarPage],
  imports: [
    IonicPageModule.forChild(DevocionaisCadastrarPage),
    ComponentsModule,
  ],
})
export class DevocionaisCadastrarPageModule {}
