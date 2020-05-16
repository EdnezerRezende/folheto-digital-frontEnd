import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs/Rx"; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();
    let N = API_CONFIG.baseUrl.length;
    let B = API_CONFIG.urlBibliaOnline.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
    let conexaoBack =
      req.url.substring(0, N) == API_CONFIG.baseUrl ||
      req.url.substring(0, B) == API_CONFIG.urlBibliaOnline ||
      req.url.substring(0, N) == API_CONFIG.bucketBaseUrl;
    if (req.url != undefined && conexaoBack) {
      this.storage.load();
    }

    if (localUser && requestToAPI) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localUser.token),
      });
      return next.handle(authReq);
    } else {
      if (req.url.substring(0, B) == API_CONFIG.urlBibliaOnline) {
        const authReqBiblia = req.clone({
          headers: req.headers.set(
            "Authorization",
            "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBNYXkgMTUgMjAyMCAxMDo0Mjo0NCBHTVQrMDAwMC41ZWJjMmNjY2VmYmE2ODAwMjM3OTQyYmQiLCJpYXQiOjE1ODk1MzkzNjR9.aNyUyq_dT4DYxD3-dJg0ZU7r6BNgh_YLCOk26Q0x0_o"
          ),
        });

        return next.handle(authReqBiblia);
      } else {
        return next.handle(req);
      }
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
