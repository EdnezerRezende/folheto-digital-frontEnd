import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
@Injectable()
export class DomainBoletimProvider {
  headersXML = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(public http: HttpClient, private storage: StorageService) {}

  // obterBoletimSemanal(idIgreja: number): Observable<Array<any>> {
  //   return this.http
  //     .get(`${API_CONFIG.baseUrl}/boletins/semanal/${idIgreja}`, {
  //       headers: this.headersXML,
  //       responseType: "blob",
  //     })
  //     .map((res) => {
  //       //CHANGE THE BASE64 DATA INTO A PDF BLOB
  //       // var blobURL = window.webkitURL.createObjectURL(res);
  //       // window.open(blobURL, "_self", "", true);
  //       // window.screen;
  //       return new Blob([res], { type: "application/x-pdf" });
  //     })
  //     .catch(this.handleError);
  // }
  obterBoletimSemanal(idIgreja: number): Observable<Blob> {
    return this.http
      .get(`${API_CONFIG.baseUrl}/boletins/semanal/${idIgreja}`, {
        responseType: "blob",
      })
      .finally(() => {
        this.storage.loadOff("");
      });
  }
}
