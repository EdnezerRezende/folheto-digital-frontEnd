import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { AgendaEventoDTO } from "../../models/agenda-evento.dto";
import { AgendaEventoNewDTO } from "../../models/agenda-evento-new.dto.1";

@Injectable()
export class AgendaEventoService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<AgendaEventoDTO[]>{
        return this.http.get<AgendaEventoDTO[]>(`${API_CONFIG.baseUrl}/eventosAgendas`);
    }

    salvar(dto:AgendaEventoNewDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/eventosAgendas/`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

    deletar(idPg:number){
        return this.http.delete(`${API_CONFIG.baseUrl}/eventosAgendas/${idPg}`,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }
}