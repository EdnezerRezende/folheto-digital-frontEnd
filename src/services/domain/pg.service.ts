import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PgDTO } from "../../models/pg.dto";

@Injectable()
export class PGService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<PgDTO[]>{
        return this.http.get<PgDTO[]>(`${API_CONFIG.baseUrl}/pgs`);
    }
}