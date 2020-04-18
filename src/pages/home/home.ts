import { Component } from "@angular/core";
import { NavController, IonicPage, NavParams } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { MenuController } from "ionic-angular/components/app/menu-controller";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public menuCtrl: MenuController
  ) {}

  logoff() {
    this.auth.logout();
    this.navCtrl.setRoot("LoginPage");
  }
  perfil() {
    this.navCtrl.push("ProfilePage");
  }

  toggleRightMenu() {
    this.menuCtrl.toggle("right");
  }
}
