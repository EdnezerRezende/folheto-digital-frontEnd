import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { MembroInfo } from '../../models/membro-info';
import { TrocarSenhaDTO } from '../../models/trocarSenha.dto';
import { AuthService } from '../../services/auth.service';
import { MembroService } from '../../services/domain/membro.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {
  formulario: FormGroup;
  membro: MembroInfo;
  profileImage;
  retorno: any = "";
  
  newPassWord: TrocarSenhaDTO = new TrocarSenhaDTO();
  confirmeNewPass: string = "";

  isTextFieldType: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public membroService: MembroService,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public auth: AuthService,
    private _alertCtrl: AlertController,
  ) {
    this.profileImage = "assets/imgs/avatar-blank.png";
    this.criarFormulario();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmeNewPass: ["", Validators.required]
    });
  }
  

  loadData() {
    let localUser = this.storage.getLocalUser();
    let usuario = this.storage.getMembro();
    if (localUser && localUser.email && usuario == undefined) {
      this.membroService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.membro = response as MembroInfo;
          this.newPassWord.email = this.membro.email;

          setTimeout(() => {
            this.getImageIfExists();
          }, 10000);
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot("TabsPage");
          }
        }
      );
    } else if (usuario && usuario.email) {
      this.membro = usuario;
      this.profileImage = this.membro.imageUrl;
    } else {
      this.navCtrl.setRoot("TabsPage");
    }
  }

  getImageIfExists() {
    this.membroService.getImageFromBucket(this.membro.id + "").subscribe(
      (response) => {
        this.membro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.membro.id}.jpg`;
        this.blobToDataURL(response).then((dataUrl) => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
      (error) => {
        this.profileImage = "assets/imgs/avatar-blank.png";
      }
    );
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  trocarSenha(){
    this._alertCtrl
    .create({
      title: "Confirma",
      subTitle:
        "A Senha atual será modificada, você confirma esta solicitação? ", 
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.confirmeTrocarSenha();
          },
        },
        {
          text: "Não",
          handler: () => {
          },
        },
      ],
    })
    .present();
  }
  
  confirmeTrocarSenha(){

    this.auth.trocarSenha(this.newPassWord).subscribe(
      (response) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle:
              "A senha foi resetada com sucesso. " +
              "Foi encaminhado no seu e-mail a solicitação acima",
            buttons: [
              {
                text: "Ok",
              },
            ],
          })
          .present();
      },
      (error) => {
        this._alertCtrl
          .create({
            title: "Erro",
            subTitle:
              "A senha não foi alterada " +
              " Favor tente mais tarde!",
            buttons: [
              {
                text: "Sim",
                handler: () => {
                  this.criarFormulario();
                },
              },
            ],
          })
          .present();
      }
    );
  }

  togglePasswordFieldType(input){
    console.log(input);
    this.isTextFieldType = !this.isTextFieldType;
  }

}
