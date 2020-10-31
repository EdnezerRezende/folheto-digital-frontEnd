import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { DevocionalDTO } from "../../models/devocional.dto";
import { DevocionalNewDTO } from "../../models/devocional-new.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class DevocionalService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  buscaTodos(idIgreja: number, idMembro: number): Observable<DevocionalDTO[]> {
    return this.http
      .get<DevocionalDTO[]>(
        `${API_CONFIG.baseUrl}/devocionais/igreja/${idIgreja}/${idMembro}`
      )
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  buscaTodosAntigos(idIgreja: number, idMembro: number): Observable<DevocionalDTO[]> {
    return this.http
      .get<DevocionalDTO[]>(
        `${API_CONFIG.baseUrl}/devocionais/antigos/igreja/${idIgreja}/${idMembro}`
      )
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  salvar(dto: DevocionalNewDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/devocionais/`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  deletar(idPg: number) {
    return this.http
      .delete(`${API_CONFIG.baseUrl}/devocionais/${idPg}`, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
