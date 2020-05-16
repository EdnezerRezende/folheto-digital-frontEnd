import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { LivroDTO } from "../../models/livro.dto";
import { AbreviacaoDTO } from "../../models/abreviacao.dto";
import { CapituloDTO } from "../../models/capitulo.dto";
import { ReferenciaDTO } from "../../models/referencia.dto";

@Injectable()
export class BibliaReferenciaService {
  constructor(public http: HttpClient, private storage: StorageService) {}

  obterLivros(): Observable<LivroDTO[]> {
    return this.http
      .get<LivroDTO[]>(`${API_CONFIG.urlBibliaOnline}/books`)
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  obterVersiculosPorCapituloELivro(
    abreviacaoLivro: AbreviacaoDTO,
    capitulo: CapituloDTO
  ) {
    let versao = "nvi";
    return this.http
      .get<ReferenciaDTO>(
        `${API_CONFIG.urlBibliaOnline}/verses/${versao}/${abreviacaoLivro.pt}/${capitulo.number}`
      )
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
