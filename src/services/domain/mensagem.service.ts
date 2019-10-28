import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { MensagemDTO } from "../../models/mensagem.dto";
import { Observable } from "rxjs/Rx";
import { MensagemNewDTO } from "../../models/mensagem-new.dto";

@Injectable()
export class MensagemService {

    constructor(public http:HttpClient){

    }

    buscaTodos(): Observable<MensagemDTO[]>{
        return this.http.get<MensagemDTO[]>(`${API_CONFIG.baseUrl}/mensagens/`);
    }

    salvar(dto:MensagemNewDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/mensagens/`, dto,
        { 
            observe: 'response', 
            responseType: 'text'
        });
    }
}