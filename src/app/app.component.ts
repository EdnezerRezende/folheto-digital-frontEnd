import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { LocalUser } from "../models/local_user";
import { MembroInfo } from "../models/membro-info";
import { MembroService } from "../services/domain/membro.service";
import { API_CONFIG } from "../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";
import { IgrejaInfoDTO } from "../models/igreja_info.dto";
import { DomainBoletimProvider } from "../services/domain/domain-boletim";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage: string = "LoginPage";

  showLevel1 = null;
  usuarioLogado: LocalUser;
  dadosMembro: MembroInfo = new MembroInfo();
  mostraCadUsuario: boolean;
  mostraOpcaoCadastro: boolean = false;
  mostraOpcaoListar: boolean = true;
  picture: any;
  avatar = "assets/img/avatar-padrao.jpg";
  showBtn: boolean = false;
  deferredPrompt: any;

  public paginas: any[] = this.tratarMenuTelaSemCadastro();

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public auth: AuthService,
    public storage: StorageService,
    public events: Events,
    public sanitizer: DomSanitizer,
    public membroService: MembroService,
    private boletimService: DomainBoletimProvider
  ) {
    events.subscribe("user:created", (user, time) => {});

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.checarPWA();
  }

  checarPWA() {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;

      // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;
    });

    //button click event to show the promt

    window.addEventListener("appinstalled", (event) => {
      console.log("installed");
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("display-mode is standalone");
    }
  }

  instalarPWA(e) {
    // hide our user interface that shows our button
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the prompt");
      } else {
        console.log("User dismissed the prompt");
      }
      this.deferredPrompt = null;
    });
  }

  tratarMenuTela(): any[] {
    return [
      {
        titulo: "Mensagens",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "MensagemCadastrarPage",
            iconeSub: "md-paper",
            mostra: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "MensagemListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-filing",
        mostra: true,
      },
      {
        titulo: "PG´s",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "PgCadastrarPage",
            iconeSub: "md-paper",
            mostraCad: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "PgListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-home",
        mostra: true,
      },
      {
        titulo: "Agendas e Eventos",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "EventoAgendaCadastrarPage",
            iconeSub: "md-paper",
            mostraCad: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "EventoAgendaListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-calendar",
        mostra: true,
      },
      {
        titulo: "Devocionais",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "DevocionaisCadastrarPage",
            iconeSub: "md-paper",
            mostraCad: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar Atuais",
            componente: "DevocionaisListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
          {
            submenu: "Listar Antigos",
            componente: "DevocionaisListarAntigosPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-bookmarks",
        mostra: true,
      },
      {
        titulo: "Ofertas e Serviços",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "OfertasServicoCadastrarPage",
            iconeSub: "md-paper",
            mostraCad: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "OfertasServicoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-hammer",
        mostra: true,
      },
      {
        titulo: "Missões",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "MissaoCadastrarPage",
            iconeSub: "md-paper",
            mostra: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "MissaoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-globe",
        mostra: true,
      },
      {
        titulo: "Aniversariantes",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "AniversarianteCadastrarPage",
            iconeSub: "md-paper",
            mostra: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "AniversariantesListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-color-wand",
        mostra: true,
      },
      {
        titulo: "Membros",
        subTitulo: [
          {
            submenu: "Cadastrar",
            componente: "SignupPage",
            iconeSub: "md-paper",
            mostra: this.mostraOpcaoCadastro,
          },
          {
            submenu: "Listar",
            componente: "MembrosListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-people",
        mostra: true,
      },
      {
        titulo: "Boletim",
        subTitulo: [
          {
            submenu: "Boletim Semanal",
            iconeSub: "md-list-box",
            componente: "BoletimPage",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-paper",
        mostra: true,
      },
      {
        titulo: "Perfil",
        subTitulo: [
          {
            submenu: "Alterar Foto",
            iconeSub: "md-camera",
            componente: "ProfilePage",
            mostra: this.mostraOpcaoListar,
          },
          {
            submenu: "Alterar Senha",
            iconeSub: "md-key",
            componente: "AlterarSenhaPage",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-cog",
        mostra: true,
      },
    ];
  }

  tratarMenuTelaVistante(): any[] {
    return [
      {
        titulo: "Mensagens",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "MensagemListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-filing",
        mostra: true,
      },
      {
        titulo: "PG´s",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "PgListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-home",
        mostra: true,
      },
      {
        titulo: "Agendas e Eventos",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "EventoAgendaListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-calendar",
        mostra: true,
      },
      {
        titulo: "Devocionais",
        subTitulo: [
          {
            submenu: "Listar Atuais",
            componente: "DevocionaisListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
          {
            submenu: "Listar Antigos",
            componente: "DevocionaisListarAntigosPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-bookmarks",
        mostra: true,
      },
      {
        titulo: "Ofertas e Serviços",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "OfertasServicoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-hammer",
        mostra: true,
      },
      {
        titulo: "Missões",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "MissaoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-filing",
        mostra: true,
      },
      {
        titulo: "Aniversariantes",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "AniversariantesListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-color-wand",
        mostra: true,
      },
      {
        titulo: "Boletim",
        subTitulo: [
          {
            submenu: "Boletim Semanal",
            componente: "BoletimPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-paper",
        mostra: true,
      },
    ];
  }

  tratarMenuTelaSemCadastro(): any[] {
    return [
      {
        titulo: "Mensagens",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "MensagemListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-filing",
        mostra: true,
      },
      {
        titulo: "PG´s",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "PgListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-home",
        mostra: true,
      },
      {
        titulo: "Agendas e Eventos",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "EventoAgendaListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-calendar",
        mostra: true,
      },
      {
        titulo: "Devocionais",
        subTitulo: [
          {
            submenu: "Listar Atuais",
            componente: "DevocionaisListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
          {
            submenu: "Listar Antigos",
            componente: "DevocionaisListarAntigosPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-bookmarks",
        mostra: true,
      },
      {
        titulo: "Ofertas e Serviços",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "OfertasServicoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-hammer",
        mostra: true,
      },
      {
        titulo: "Missões",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "MissaoListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-filing",
        mostra: true,
      },
      {
        titulo: "Aniversariantes",
        subTitulo: [
          {
            submenu: "Listar",
            componente: "AniversariantesListarPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-color-wand",
        mostra: true,
      },
      {
        titulo: "Boletim",
        subTitulo: [
          {
            submenu: "Boletim Semanal",
            componente: "BoletimPage",
            iconeSub: "md-list-box",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-paper",
        mostra: true,
      },
      {
        titulo: "Perfil",
        subTitulo: [
          {
            submenu: "Alterar Foto",
            iconeSub: "md-camera",
            componente: "ProfilePage",
            mostra: this.mostraOpcaoListar,
          },
          {
            submenu: "Alterar Senha",
            iconeSub: "md-key",
            componente: "AlterarSenhaPage",
            mostra: this.mostraOpcaoListar,
          },
        ],
        icone: "md-cog",
        mostra: true,
      },
    ];
  }

  get membroLogado() {
    this.dadosMembro = this.storage.getMembro();
    return this.dadosMembro;
  }

  abrePagina(pagina): void {
    this.menuCtrl.close();
    this.nav.popToRoot();
    if (pagina.titulo == "Sair") {
      this.logoff();
    } else if (pagina.titulo == "Boletim Semanal") {
      this.openPdf();
    } else {
      this.nav.push(pagina.componente);
      this.menuCtrl.close();
    }
    this.toggleLevel1(undefined);
  }

  openPdf() {
    let igreja: IgrejaInfoDTO = this.storage.getIgreja();
    this.boletimService.obterBoletimSemanal(igreja.id).subscribe((data) => {
      let newBlob = new Blob([data], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const dataConv = window.URL.createObjectURL(newBlob);

      var link = document.createElement("a");
      link.href = dataConv;
      link.download = "Boletim Semanal.pdf";

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(function () {
        window.URL.revokeObjectURL(dataConv);
        link.remove();
      }, 100);

      (error) => {
        console.log(error);
      };
    });
    this.nav.setRoot("TabsPage");
  }

  get imagemTratada() {
    if (!this.picture && this.membroLogado != undefined) {
      this.membroService.getImageFromBucket(this.dadosMembro.id + "").subscribe(
        (response) => {
          this.dadosMembro.imageUrl = `${API_CONFIG.bucketBaseUrl}/membro${this.dadosMembro.id}.jpg`;
          this.blobToDataURL(response).then((dataUrl) => {
            let str: string = dataUrl as string;
            this.picture = this.sanitizer.bypassSecurityTrustUrl(str);
            return this.picture;
          });
        },
        (error) => {
          this.picture = "assets/img/avatar-padrao.jpg";
          return this.picture;
        }
      );
      // return this.storage.getMembro().imageUrl;
    }
    return this.picture;
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  get obterMenu() {
    this.mostraOpcaoCadastro = this.storage.temPerfilAdminLider();
    if (this.mostraOpcaoCadastro) {
      this.paginas = this.tratarMenuTela();
    } else if (this.storage.temPerfilVisitante()) {
      this.paginas = this.tratarMenuTelaVistante();
    } else {
      this.paginas = this.tratarMenuTelaSemCadastro();
    }
    return this.paginas;
  }

  logoff() {
    this.mostraOpcaoCadastro = false;
    this.mostraOpcaoListar = true;
    this.picture = undefined;
    this.menuCtrl.enable(false);
    this.menuCtrl.close();
    this.dadosMembro = undefined;
    this.auth.logout();
    this.nav.setRoot("LoginPage");
  }

  irPagina(componente) {
    this.menuCtrl.close();
    this.nav.popToRoot();
    if (componente == "BoletimPage") {
      this.openPdf();
    } else {
      this.nav.push(componente);
    }
    this.toggleLevel1(undefined);
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  }
}
