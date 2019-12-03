import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Events } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { MembroService } from '../../services/domain/membro.service';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../models/local_user';
import { MembroInfo } from '../../models/membro-info';
import { IgrejaService } from '../../services/domain/igreja.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  membro:MembroInfo = new MembroInfo();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menu: MenuController,
    public auth: AuthService,
    public membroService: MembroService,
    public storage: StorageService,
    public events: Events,
    public igrejaService:IgrejaService
    ) {
  }

  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now());
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
    
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('TabsPage');
      },
      error => {});  
  }

  login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      let user:LocalUser = this.storage.getLocalUser();
      this.membroService.findByEmail(user.email).subscribe(resposta => {
        this.membro = resposta;
        this.storage.setMembro(this.membro);
        this.createUser(this.membro);

        this.igrejaService.obterIgreja(this.membro.igrejaId)
        .subscribe(resposta =>{
          this.storage.setIgreja(resposta);
        }, error => {
          console.log("Não foi possivel obter a igreja");
        });

      }, error => {
        
      });
      this.navCtrl.setRoot('TabsPage');
    },
    error => {});    
  }


}
