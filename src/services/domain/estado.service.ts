import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class EstadoService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  findAll(): Observable<EstadoDTO[]> {
    return this.http
      .get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`)
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
