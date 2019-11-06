import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MensagemService } from '../services/domain/mensagem.service';
import { CommonModule } from '@angular/common';
import { PGService } from '../services/domain/pg.service';
import { RichTextModule } from 'ionic-rich-text/dist/rich-text-module';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { DominiosService } from '../dominios/dominios.service';
import { EstadoService } from '../services/domain/estado.service';
import { CidadeService } from '../services/domain/cidade.service';
import { AgendaEventoService } from '../services/domain/agenda-evento.service';
import { DevocionalService } from '../services/domain/devocional.service';
import { StorageService } from '../services/storage.service';
import { ImageUtilService } from '../services/image-util.service';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'md-transition  ',
      menuType: 'overlay',
      RichTextModule
    }),
    OrderModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    CommonModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MensagemService,
    PGService,
    ErrorInterceptorProvider,
    DominiosService,
    EstadoService,
    CidadeService,
    AgendaEventoService,
    DevocionalService,
    StorageService,
    ImageUtilService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
