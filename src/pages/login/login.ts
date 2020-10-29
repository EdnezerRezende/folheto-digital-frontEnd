import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Events,
} from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { CredenciaisDTO } from "../../models/credenciais.dto";
import { MembroService } from "../../services/domain/membro.service";
import { StorageService } from "../../services/storage.service";
import { LocalUser } from "../../models/local_user";
import { MembroInfo } from "../../models/membro-info";
import { IgrejaService } from "../../services/domain/igreja.service";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  creds: CredenciaisDTO = {
    email: "",
    senha: "",
  };

  membro: MembroInfo = new MembroInfo();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public auth: AuthService,
    public membroService: MembroService,
    public storage: StorageService,
    public events: Events,
    public igrejaService: IgrejaService,
    public sanitizer: DomSanitizer
  ) {
    this.creds = new CredenciaisDTO();
  }

  createUser(user) {
    console.log("User created! aqui");
    this.events.publish("user:created", user, Date.now());
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      (response) => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("TabsPage");
      },
      (error) => {}
    );
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(
      (response) => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        let user: LocalUser = this.storage.getLocalUser();
        this.membroService.findByEmail(user.email).subscribe(
          (resposta) => {
            this.membro = resposta;
            this.storage.setMembro(this.membro);
            this.createUser(this.membro);

            this.igrejaService.obterIgreja(this.membro.igrejaId).subscribe(
              (resposta) => {
                this.storage.setIgreja(resposta);
              },
              (error) => {
                console.log("Não foi possivel obter a igreja");
              }
            );
            this.membroService
              .getImageFromBucket(this.membro.id + "")
              .subscribe(
                (response) => {
                  this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
                  this.storage.setMembro(this.membro);
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {}
        );
        this.navCtrl.setRoot("TabsPage");
      },
      (error) => {}
    );
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

  resetarSenha(){
    this.navCtrl.push("EsqueceuSenhaPage", { email: this.creds.email });
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
