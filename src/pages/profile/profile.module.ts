import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfilePage } from "./profile";
import { Camera } from "@ionic-native/camera";
import { WebCamModule } from "ack-angular-webcam";

@NgModule({
  declarations: [ProfilePage],
  imports: [IonicPageModule.forChild(ProfilePage), WebCamModule],
  providers: [Camera],
})
export class ProfilePageModule {}
