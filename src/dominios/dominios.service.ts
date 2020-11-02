// import { KeycloakHttp } from "../keycloak-service/keycloak.http";
import { Injectable } from "@angular/core";

@Injectable()
export class DominiosService {
  constructor() {}

  static getValueDominioTodosValor(enumeracao) {
    let lista = [];
    for (let key in enumeracao) {
      lista.push(enumeracao[key]);
    }
    return lista;
  }

  static getValueDominioKey(enumeracao, valor) {
    for (let [key] of Object(enumeracao)) {
      return key;
    }
  }

  static getValueDominioPassandoKey(enumeracao, entidadeRecebida: any[]) {
    let lista = [];
    for (let item of entidadeRecebida) {
      if (item in enumeracao) {
        lista.push(enumeracao[item]);
      }
    }
    return lista;
  }

  static getKeyDominioPassandoValor(enumeracao, entidadeRecebida: any[]) {
    let lista = [];

    for (let item of entidadeRecebida) {
      for (let key in enumeracao) {
        if (item == enumeracao[key]) {
          lista.push(key);
        }
      }
    }
    return lista;
  }
}
