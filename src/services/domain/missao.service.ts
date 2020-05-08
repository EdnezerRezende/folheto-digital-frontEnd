import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { MissaoDTO } from "../../models/missao.dto";
import { MissaoNewDTO } from "../../models/missao-new.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class MissaoService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  buscaTodos(): Observable<MissaoDTO[]> {
    return this.http
      .get<MissaoDTO[]>(`${API_CONFIG.baseUrl}/missoes/`)
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  salvar(dto: MissaoNewDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/missoes/`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  deletarMissao(idMissao: number) {
    return this.http
      .delete(`${API_CONFIG.baseUrl}/missoes/${idMissao}`, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
