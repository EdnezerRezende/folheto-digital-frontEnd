// import { KeycloakHttp } from "../keycloak-service/keycloak.http";
import { Injectable } from "@angular/core";

@Injectable()
export class DominiosService {

  constructor() {
  }

  static getValueDominioTodosValor(enumeracao) {
    let lista = [];
    for (let key in enumeracao)
    {
      lista.push( enumeracao[key] );  
    }
    return lista;
  }

  static getValueDominioKey(enumeracao, valor) {
    console.log(valor);
    for (let [key] of Object(enumeracao)) {
      return key;
    }
  }

 

}
