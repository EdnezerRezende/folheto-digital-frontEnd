import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
import { IgrejaDTO } from "../../models/igreja.dto";

@Injectable()
export class IgrejaService {
  constructor(public http: HttpClient) {}

  obterIgreja(id: number): Observable<IgrejaInfoDTO> {
    return this.http.get<IgrejaInfoDTO>(`${API_CONFIG.baseUrl}/igrejas/${id}`);
  }

  obterTodasIgrejas(): Observable<IgrejaDTO[]> {
    return this.http.get<IgrejaDTO[]>(`${API_CONFIG.baseUrl}/igrejas`);
  }
}
