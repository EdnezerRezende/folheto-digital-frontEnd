import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SignupPage } from "./signup";
import { CidadeService } from "../../services/domain/cidade.service";
import { EstadoService } from "../../services/domain/estado.service";
import { BrMaskerModule } from "brmasker-ionic-3";

@NgModule({
  declarations: [SignupPage],
  imports: [IonicPageModule.forChild(SignupPage),
    BrMaskerModule],
  providers: [CidadeService, EstadoService]
})
export class SignupPageModule {}
