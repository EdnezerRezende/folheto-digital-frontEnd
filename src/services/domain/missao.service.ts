import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { MissaoDTO } from "../../models/missao.dto";
import { MissaoNewDTO } from "../../models/missao-new.dto";

@Injectable()
export class MissaoService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<MissaoDTO[]>{
        return this.http.get<MissaoDTO[]>(`${API_CONFIG.baseUrl}/missoes/`);
    }

    salvar(dto:MissaoNewDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/missoes/`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

    deletarMissao(idMissao:number){
        return this.http.delete(`${API_CONFIG.baseUrl}/missoes/${idMissao}`,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

    
}