import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { AgendaEventoDTO } from "../../models/agenda-evento.dto";
import { AgendaEventoNewDTO } from "../../models/agenda-evento-new.dto.1";
import { ContatoDTO } from "../../models/contato.dto";

@Injectable()
export class EmailService {

    constructor(public http:HttpClient){

    }

    enviarContato(dto:ContatoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/emails/contato`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }

}