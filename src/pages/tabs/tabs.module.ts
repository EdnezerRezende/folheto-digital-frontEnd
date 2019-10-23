import { IonicPageModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { TabsPage } from "./tabs";

@NgModule({
    declarations: [
      TabsPage,
      ],
      imports: [
        IonicPageModule.forChild(TabsPage),
      ]
  })
  export class TabsModule {}
  