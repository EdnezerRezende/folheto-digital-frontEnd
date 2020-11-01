import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Membro } from "../models/membro";
import { RecuperarSenhaDTO } from "../models/recuperarSenha.dto";
import { TrocarSenhaDTO } from "../models/trocarSenha.dto";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(public http: HttpClient, public storage: StorageService) {}

  authenticate(creds: CredenciaisDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/login`, creds, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  refreshToken() {
    return this.http
      .post(
        `${API_CONFIG.baseUrl}/auth/refresh_token`,
        {},
        {
          observe: "response",
          responseType: "text",
        }
      )
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub,
    };

    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
    this.storage.setIgreja(null);
    this.storage.setMembro(null);
  }

  signup(values: any): Observable<any> {
    return this.http
      .post(`${API_CONFIG.baseUrl}/auth/signup`, values, {
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      })
      .pipe(
        tap((jwt) => {
          if (jwt !== "EXISTS") {
            return this.handleJwtResponse(jwt, values);
          }
          return jwt;
        })
      );
  }

  forgot(dto: RecuperarSenhaDTO){
    return this.http
      .post(`${API_CONFIG.baseUrl}/auth/forgot`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  trocarSenha(dto: TrocarSenhaDTO){
    return this.http
      .post(`${API_CONFIG.baseUrl}/auth/forgot/newPassword`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  private handleJwtResponse(jwt: string, membro: Membro) {
    // return this.storage
    //   .set(this.jwtTokenName, jwt)
    //   .then(() => {
    //     this.authUser.next(jwt);
    //     this.http.criarHeaderAutorizacao(jwt);
    //     localStorage.setItem("jwt_token", jwt);
    //     this._usuariosService.setUsuarioLogado(usuario, jwt);
    //   })
    //   .then(() => {
    //     localStorage.setItem("jwt_token", jwt);
    //     return jwt;
    //   });
  }
}
