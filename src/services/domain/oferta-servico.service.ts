import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { OfertaServicoDTO } from "../../models/ofertaServico.dto";
import { OfertaServicoNewDTO } from "../../models/ofertaServico-new.dto";

@Injectable()
export class OfertaServicoService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<OfertaServicoDTO[]>{
        return this.http.get<OfertaServicoDTO[]>(`${API_CONFIG.baseUrl}/ofertas`);
    }

    salvar(dto:OfertaServicoNewDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/ofertas/`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

    deletar(idPg:number){
        return this.http.delete(`${API_CONFIG.baseUrl}/ofertas/${idPg}`,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }
}