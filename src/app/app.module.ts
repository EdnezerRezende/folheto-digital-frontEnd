import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { OrderModule } from "ngx-order-pipe";
import { HttpClientModule } from "@angular/common/http";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MensagemService } from "../services/domain/mensagem.service";
import { CommonModule } from "@angular/common";
import { PGService } from "../services/domain/pg.service";
import { RichTextModule } from "ionic-rich-text/dist/rich-text-module";
import { ErrorInterceptorProvider } from "../interceptors/error-interceptor";
import { DominiosService } from "../dominios/dominios.service";
import { EstadoService } from "../services/domain/estado.service";
import { CidadeService } from "../services/domain/cidade.service";
import { AgendaEventoService } from "../services/domain/agenda-evento.service";
import { DevocionalService } from "../services/domain/devocional.service";
import { StorageService } from "../services/storage.service";
import { ImageUtilService } from "../services/image-util.service";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { AuthService } from "../services/auth.service";
import { AuthInterceptorProvider } from "../interceptors/auth-interceptor";
import { MembroService } from "../services/domain/membro.service";
import { IgrejaService } from "../services/domain/igreja.service";
import { BrMaskerModule } from "brmasker-ionic-3";
import { OfertaServicoService } from "../services/domain/oferta-servico.service";
import { MissaoService } from "../services/domain/missao.service";
import { EmailService } from "../services/domain/email.service";
import { Camera } from "@ionic-native/camera";
import { AniversarianteService } from "../services/domain/aniversariante.service";
@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "Voltar",
      iconMode: "ios",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabsPlacement: "bottom",
      pageTransition: "md-transition  ",
      menuType: "overlay",
      RichTextModule,
    }),
    OrderModule,
    IonicImageViewerModule,
    BrMaskerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    CommonModule,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MensagemService,
    PGService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    DominiosService,
    EstadoService,
    CidadeService,
    AgendaEventoService,
    DevocionalService,
    StorageService,
    ImageUtilService,
    AuthService,
    MembroService,
    IgrejaService,
    OfertaServicoService,
    MissaoService,
    EmailService,
    Camera,
    AniversarianteService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
