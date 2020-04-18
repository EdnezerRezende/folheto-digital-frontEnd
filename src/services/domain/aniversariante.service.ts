import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { AniversarianteInfoDTO } from "../../models/aniversariante-info.dto";
import { AniversarianteNewDTO } from "../../models/aniversariante-new.dto";
import { AniversarianteAlteraDTO } from "../../models/aniversariante-altera.dto";

@Injectable()
export class AniversarianteService {
  constructor(public http: HttpClient) {}

  buscaTodosAnviversariantes(
    idIgreja: number
  ): Observable<AniversarianteInfoDTO[]> {
    return this.http.get<AniversarianteInfoDTO[]>(
      `${API_CONFIG.baseUrl}/aniversariantes/igreja/${idIgreja}`
    );
  }

  deletar(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/aniversariantes/${id}`, {
      observe: "response",
      responseType: "text",
    });
  }

  alterarDados(obj: AniversarianteAlteraDTO, id) {
    return this.http.put(`${API_CONFIG.baseUrl}/aniversariantes/${id}`, obj, {
      observe: "response",
      responseType: "text",
    });
  }

  insert(obj: AniversarianteNewDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/aniversariantes`, obj, {
      observe: "response",
      responseType: "text",
    });
  }
}
