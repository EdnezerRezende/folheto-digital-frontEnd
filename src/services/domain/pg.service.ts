import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PgDTO } from "../../models/pg.dto";
import { PgNewDTO } from "../../models/pg-new.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class PGService {
  constructor(
    public http: HttpClient,
    private imageUtilService: ImageUtilService,
    private storage: StorageService
  ) {}

  buscaTodos(): Observable<PgDTO[]> {
    return this.http.get<PgDTO[]>(`${API_CONFIG.baseUrl}/pgs`).finally(() => {
      this.storage.loadOff("");
    });
  }

  salvar(dto: PgNewDTO) {
    return this.http
      .post(`${API_CONFIG.baseUrl}/pgs/`, dto, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  deletar(idPg: number) {
    return this.http
      .delete(`${API_CONFIG.baseUrl}/pgs/${idPg}`, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  getSmallImageFromBucket(id: number): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/Pg${id}.jpg`;
    return this.http.get(url, { responseType: "blob" }).finally(() => {
      this.storage.loadOff("");
    });
  }

  uploadPicture(picture, idPg: number) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set("file", pictureBlob, "file.png");
    return this.http
      .post(`${API_CONFIG.baseUrl}/pgs/picture/${idPg}`, formData, {
        observe: "response",
        responseType: "text",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }

  getImageFromBucket(id: number): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/Pg${id}.jpg`;
    return this.http.get(url, { responseType: "blob" }).finally(() => {
      this.storage.loadOff("");
    });
  }
}
