import { Component, ViewChild } from '@angular/core';
import { Platform, App, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativePageTransitionsOriginal, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { LocalUser } from '../models/local_user';
import { Membro } from '../models/membro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:string = 'LoginPage';

  showLevel1 = null;
  usuarioLogado: LocalUser;
  dadosMembro:Membro = new Membro();
  mostraCadUsuario: boolean;
  mostraOpcaoCadastro: boolean = false;
  mostraOpcaoListar: boolean = true;
  
  public paginas:any[] = this.tratarMenuTelaSemCadastro();
  


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl: MenuController,
    private _appCtrl: App, public auth: AuthService, public storage: StorageService, public events: Events
    ) {
      events.subscribe('user:created', (user, time) => {
        console.log('Bem Vindo ', user.nome , ' as ', time);
        
      });
      
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
      };
  
    // this._nativePageTransitions.slide(options);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  tratarMenuTela():any[]{
    return [
      { titulo: "Mensagens", 
            subTitulo: [
                        {submenu:'Cadastrar', componente:'MensagemCadastrarPage', iconeSub: 'md-paper', mostra: this.mostraOpcaoCadastro },
                        {submenu:'Listar', componente:'MensagemListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar }
                      ], 
          icone: 'md-filing', mostra: true},
      { titulo: "PG´s", 
          subTitulo: [
                      {submenu:'Cadastrar', componente:'PgCadastrarPage', iconeSub: 'md-paper', mostraCad: this.mostraOpcaoCadastro },
                      {submenu:'Listar', componente:'PgListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                    ], 
        icone: 'md-home', mostra: true},
      { titulo: "Agendas e Eventos", 
        subTitulo: [
                    {submenu:'Cadastrar', componente:'EventoAgendaCadastrarPage', iconeSub: 'md-paper', mostraCad: this.mostraOpcaoCadastro },
                    {submenu:'Listar', componente:'EventoAgendaListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                  ], 
      icone: 'md-calendar', mostra: true},
      { titulo: "Devocionais", 
        subTitulo: [
                    {submenu:'Cadastrar', componente:'DevocionaisCadastrarPage', iconeSub: 'md-paper', mostraCad: this.mostraOpcaoCadastro },
                    {submenu:'Listar', componente:'DevocionaisListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                  ], 
      icone: 'md-bookmarks', mostra: true}
      ];
  }

  tratarMenuTelaSemCadastro():any[]{
    return [
      { titulo: "Mensagens", 
            subTitulo: [
                        {submenu:'Listar', componente:'MensagemListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar }
                      ], 
          icone: 'md-filing', mostra: true},
      { titulo: "PG´s", 
          subTitulo: [
                      {submenu:'Listar', componente:'PgListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                    ], 
        icone: 'md-home', mostra: true},
      { titulo: "Agendas e Eventos", 
        subTitulo: [
                    {submenu:'Listar', componente:'EventoAgendaListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                  ], 
      icone: 'md-calendar', mostra: true},
      { titulo: "Devocionais", 
        subTitulo: [
                    {submenu:'Listar', componente:'DevocionaisListarPage', iconeSub:'md-list-box', mostra: this.mostraOpcaoListar}
                  ], 
      icone: 'md-bookmarks', mostra: true}
      ];
  }

  get membroLogado() {
    this.dadosMembro = this.storage.getMembro();
    return this.storage.getMembro();
  }

  get obterMenu(){
    this.mostraOpcaoCadastro = this.storage.temPerfilAdminLider();
    if ( this.mostraOpcaoCadastro ){
      this.paginas = this.tratarMenuTela();
    }else{
      this.paginas = this.tratarMenuTelaSemCadastro();
    }
    return this.paginas;
  }
  logoff(){
    this.auth.logout();
    this.storage.setMembro(null);
    this.storage.setLocalUser(null);
    this.mostraOpcaoCadastro = false;
    this.mostraOpcaoListar = true;
    this.nav.setRoot('LoginPage');
  }

  irPagina(componente){
    let options: NativeTransitionOptions={
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50

    };
    // this._nativePageTransitions.slide(options);
    this.nav.push(componente);
  }

  avatar = 'assets/img/avatar-padrao.jpg';
  
  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
}
