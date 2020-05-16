import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { ComentarioDTO } from "../../models/comentarios";
import { DevocionalComentarioNewDTO } from "../../models/devocional-comentario-new.dto";

@Injectable()
export class DevocionalComentarioService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  buscarPorReferenciaEMembro(
    idMembro: number,
    idReferencia: number
  ): Observable<ComentarioDTO> {
    return this.http
      .get<ComentarioDTO>(
        `${API_CONFIG.baseUrl}/comentarios/${idMembro}/${idReferencia}`
      )
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  salvar(dto: DevocionalComentarioNewDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/comentarios/`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  deletar(idComentario: number) {
    return this.http
      .delete(`${API_CONFIG.baseUrl}/comentarios/${idComentario}`, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
