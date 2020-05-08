import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { MensagemDTO } from "../../models/mensagem.dto";
import { Observable } from "rxjs/Rx";
import { MensagemNewDTO } from "../../models/mensagem-new.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class MensagemService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  buscaTodos(): Observable<MensagemDTO[]> {
    return this.http
      .get<MensagemDTO[]>(`${API_CONFIG.baseUrl}/mensagens/`)
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  salvar(dto: MensagemNewDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/mensagens/`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  deletarMensagem(idMensagem: number) {
    return this.http
      .delete(`${API_CONFIG.baseUrl}/mensagens/${idMensagem}`, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
