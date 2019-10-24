import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  formGroup: FormGroup;
  mostrarMap: boolean = false;
  
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    ) {
      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        telefone : ['', [Validators.required]],
        assunto : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        mensagem : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(200)]],
      });

  }

  enviarEmail(){
    console.log("E-mail enviado");
    console.log(this.formGroup);
  }

  visualizarMap(){
    this.mostrarMap = !this.mostrarMap;
  }
}
