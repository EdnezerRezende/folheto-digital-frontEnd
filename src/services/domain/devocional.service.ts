import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { DevocionalDTO } from "../../models/devocional.dto";
import { DevocionalNewDTO } from "../../models/devocional-new.dto";

@Injectable()
export class DevocionalService {
  constructor(public http: HttpClient) {}

  buscaTodos(idIgreja: number): Observable<DevocionalDTO[]> {
    return this.http.get<DevocionalDTO[]>(
      `${API_CONFIG.baseUrl}/devocionais/igreja/${idIgreja}`
    );
  }

  salvar(dto: DevocionalNewDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/devocionais/`, dto, {
      observe: "response",
      responseType: "text",
    });
  }

  deletar(idPg: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/devocionais/${idPg}`, {
      observe: "response",
      responseType: "text",
    });
  }
}
