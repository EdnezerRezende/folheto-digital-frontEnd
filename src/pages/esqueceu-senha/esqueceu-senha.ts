import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecuperarSenhaDTO } from '../../models/recuperarSenha.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-esqueceu-senha',
  templateUrl: 'esqueceu-senha.html',
})
export class EsqueceuSenhaPage {
  recuperarDto: RecuperarSenhaDTO = new RecuperarSenhaDTO();

  formulario: FormGroup;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    private _alertCtrl: AlertController,
    private fb: FormBuilder
    ) {
    
      this.criarFormulario();
      if (this.navParams.get("email")) {
        this.recuperarDto.email = this.navParams.get("email");
      }
  }

  ionViewDidLoad() {
  }

  private criarFormulario() {
    this.formulario = this.fb.group({
      email: ["", Validators.required],
    });
  }
  
  resetarSenha(){
    this._alertCtrl
          .create({
            title: "Confirma",
            subTitle:
              "Será gerada uma nova senha, você confirma esta solicitação? ", 
            buttons: [
              {
                text: "Sim",
                handler: () => {
                  this.recuperarSenha();
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
  recuperarSenha(){
    console.log("Recuperar Senha");

    this.auth.forgot(this.recuperarDto).subscribe(
      (response) => {
        this._alertCtrl
          .create({
            title: "Sucesso",
            subTitle:
              "A senha foi resetada com sucesso. " +
              " Favor verificar em seu e-mail a nova senha enviada!",
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
              "A senha não foi resetada " +
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
}
