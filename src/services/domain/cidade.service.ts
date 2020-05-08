import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class CidadeService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  findAll(estado_id: string): Observable<CidadeDTO[]> {
    return this.http
      .get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`)
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
