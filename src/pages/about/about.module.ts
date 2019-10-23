import { IonicPageModule } from "ionic-angular";
import { AboutPage } from "./about";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        AboutPage,
      ],
      imports: [
        IonicPageModule.forChild(AboutPage),
      ]
  })
  export class AboutModule {}
  