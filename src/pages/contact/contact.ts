import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { MembroInfo } from '../../models/membro-info';
import { IgrejaInfoDTO } from '../../models/igreja_info.dto';
import { EmailComposerOptions } from '@ionic-native/email-composer';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  formGroup: FormGroup;
  mostrarMap: boolean = false;
  membro: MembroInfo = new MembroInfo();
  igreja:IgrejaInfoDTO = new IgrejaInfoDTO();
  
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage:StorageService,
    private _loadingCtrl: LoadingController,
    private emailComposer: EmailComposer
    ) {
      this.membro = this.storage.getMembro();
      this.criarFormulario();
  }

  ionViewWillEnter() {
    
  }

  get obterDadosIgreja():IgrejaInfoDTO{
    let igreja:IgrejaInfoDTO = this.storage.getIgreja();
    return igreja;
  }

  
  obterLoading() {
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: [this.membro.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: [this.membro.email, [Validators.required, Validators.email]],
      telefone: [this.membro.telefone1, [Validators.required]],
      assunto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      mensagem: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(200)]],
    });
  }

  enviarEmail(){
    console.log("E-mail enviado");
    console.log(this.formGroup);

    let email = {
      to: 'godoirezende@gmail.com',
      cc: this.membro.email,
      attachments: [],
      subject: this.formGroup.value.assunto,
      body: this.formGroup.value.mensagem,
      isHtml: true
    }

    this.emailComposer.open(email);

  }

  visualizarMap(){
    this.mostrarMap = !this.mostrarMap;
  }
}
