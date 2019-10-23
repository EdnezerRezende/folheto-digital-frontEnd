import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { ContactPage } from "./contact";

@NgModule({
    declarations: [
      ContactPage,
      ],
      imports: [
        IonicPageModule.forChild(ContactPage),
      ]
  })
  export class ContactModule {}
  