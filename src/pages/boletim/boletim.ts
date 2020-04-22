import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { DomainBoletimProvider } from "../../services/domain/domain-boletim";
import { StorageService } from "../../services/storage.service";
import { IgrejaInfoDTO } from "../../models/igreja_info.dto";
@IonicPage()
@Component({
  selector: "page-boletim",
  templateUrl: "boletim.html",
})
export class BoletimPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private boletimService: DomainBoletimProvider,
    private localStorage: StorageService,
    private _loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.openPdf();
  }

  obterLoading() {
    return this._loadingCtrl.create({
      content: "Carregando...",
    });
  }

  openPdf() {
    let loading = this.obterLoading();
    loading.present();

    let igreja: IgrejaInfoDTO = this.localStorage.getIgreja();
    this.boletimService.obterBoletimSemanal(igreja.id).subscribe((data) => {
      let newBlob = new Blob([data], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const dataConv = window.URL.createObjectURL(newBlob);

      var link = document.createElement("a");
      link.href = dataConv;
      link.download = "Boletim Semanal.pdf";

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(function () {
        window.URL.revokeObjectURL(dataConv);
        link.remove();
      }, 100);

      loading.dismiss();
      (error) => {
        loading.dismiss();
      };
    });
    this.navCtrl.setRoot("TabsPage");
  }
}
