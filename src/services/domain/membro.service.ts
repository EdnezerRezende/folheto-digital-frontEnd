import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Membro } from "../../models/membro";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { MembroInfo } from "../../models/membro-info";
import { MembroNewDTO } from "../../models/membro-new.dto";
import { MembroAlteraPerfilDTO } from "../../models/membro-altera-perfil.dto";
import { MembroAlteraDadosDTO } from "../../models/membro-altera-dados.dto";

@Injectable()
export class MembroService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService
  ) {}

  findById(id: string): Observable<Membro> {
    return this.http.get<Membro>(`${API_CONFIG.baseUrl}/membros/${id}`);
  }

  findByEmail(email: string): Observable<MembroInfo> {
    return this.http.get<MembroInfo>(
      `${API_CONFIG.baseUrl}/membros/email?value=${email}`
    );
  }

  getSmallImageFromBucket(id: number): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/membro${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/membro${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(obj: MembroNewDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/membros`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set("file", pictureBlob, "file.png");
    return this.http.post(`${API_CONFIG.baseUrl}/membros/picture`, formData, {
      observe: "response",
      responseType: "text"
    });
  }

  buscaTodosAnviversariantes(idIgreja: number): Observable<Membro[]> {
    return this.http.get<Membro[]>(
      `${API_CONFIG.baseUrl}/membros/aniversariantes/${idIgreja}`
    );
  }

  buscaTodosPorIgreja(idIgreja: number): Observable<Membro[]> {
    return this.http.get<Membro[]>(
      `${API_CONFIG.baseUrl}/membros/igreja/${idIgreja}`
    );
  }

  deletar(idMembro: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}/membros/${idMembro}`, {
      observe: "response",
      responseType: "text"
    });
  }

  alterarPerfil(obj:MembroAlteraPerfilDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/membros/perfil`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  alterarDados(obj:MembroAlteraDadosDTO, id){
    return this.http.put(`${API_CONFIG.baseUrl}/membros/${id}`, obj, {
      observe: "response",
      responseType: "text"
    });
  }
}
