import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs/Rx"; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { FieldMessage } from "../models/fieldmessage";
import { StorageService } from "../services/storage.service";
// import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.storage.loadOff("Teste");
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      // if (errorObj.error) {
      //   errorObj = errorObj.error;
      // }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        case 404:
          this.handle404(errorObj);
          break;

        case 422:
          this.handle422(errorObj);
          break;

        case 500:
          this.handle500(errorObj);
          break;

        default:
          this.handleDefaultEror(errorObj);
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }
  handle404(errorObj) {
    if (
      errorObj.message.indexOf(
        "Http failure response for https://igreja-cristo.herokuapp.com/boletins/semanal/1: 404 OK"
      ) != -1
    ) {
      let alert = this.alertCtrl.create({
        title: "Erro",
        message:
          "Não Existe texto de Missão ou Mensagem.Necessário cadastrar para este período.",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Ok",
          },
        ],
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: "Página não encontrada",
        message: "A Página requisitada não foi encontrada!",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Ok",
          },
        ],
      });
      alert.present();
    }
  }
  handle401() {
    let alert = this.alertCtrl.create({
      title: "Falha de autenticação",
      message: "E-mail ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        },
      ],
    });
    alert.present();
  }

  handle422(errorObj) {
    let alert = this.alertCtrl.create({
      title: "Erro 422: Validação",
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        },
      ],
    });
    alert.present();
  }

  handle500(errorObj) {
    if (errorObj.message.indexOf("AuthenticationFailedException") != -1) {
      let alert = this.alertCtrl.create({
        title: "Erro 500: Envio de E-mail",
        message:
          "O servidor de envio de E-mail está inoperante no momento." +
          " Tente novamente mais tarde!",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Ok",
          },
        ],
      });
      alert.present();
    }
  }

  handleDefaultEror(errorObj) {
    let alert = this.alertCtrl.create({
      title: "Erro " + errorObj.status + ": " + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        },
      ],
    });
    alert.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    let s: string = "";
    for (var i = 0; i < messages.length; i++) {
      s =
        s +
        "<p><strong>" +
        messages[i].fieldName +
        "</strong>: " +
        messages[i].message +
        "</p>";
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
