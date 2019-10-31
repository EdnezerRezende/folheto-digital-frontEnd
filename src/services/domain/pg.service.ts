import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PgDTO } from "../../models/pg.dto";
import { PgNewDTO } from "../../models/pg-new.dto";

@Injectable()
export class PGService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<PgDTO[]>{
        return this.http.get<PgDTO[]>(`${API_CONFIG.baseUrl}/pgs`);
    }

    salvar(dto:PgNewDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/pgs/`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

    deletar(idPg:number){
        return this.http.delete(`${API_CONFIG.baseUrl}/pgs/${idPg}`,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }
}