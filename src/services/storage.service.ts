import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { ComentarioDTO } from "../models/comentarios";
import { MembroInfo } from "../models/membro-info";
import { IgrejaInfoDTO } from "../models/igreja_info.dto";
import { BrMaskerIonicServices3, BrMaskModel } from "brmasker-ionic-3";
import { LoadingController } from "ionic-angular";
import { BibliaToken } from "../models/biblia_token";

@Injectable()
export class StorageService {
  membro: MembroInfo = new MembroInfo();
  loading;

  constructor(
    private brMasker: BrMaskerIonicServices3,
    private _loadingCtrl: LoadingController
  ) {}

  load() {
    if (!this.loading) {
      this.loading = this.obterLoading();
      this.loading.present();
    }
  }
  loadOff(nada: any) {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = undefined;
    }
  }

  tokenBiblia(obj: BibliaToken) {
    localStorage.setItem(STORAGE_KEYS.tokenBiblia, JSON.stringify(obj));
  }
  getTokenBiblia() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.tokenBiblia));
  }
  obterLoading() {
    return this._loadingCtrl.create({
      // dismissOnPageChange: true,
      spinner: "dots",
      content: "Aguarde",
    });
  }
  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getMembro(): MembroInfo {
    let usr = localStorage.getItem(STORAGE_KEYS.membro);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setMembro(obj: MembroInfo) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.membro);
    } else {
      let config: BrMaskModel = new BrMaskModel();
      config.phone = true;
      obj.telefone1 = this.brMasker.writeCreateValue(obj.telefone1, config);

      config = new BrMaskModel();
      config.mask = "000.000.000-00";

      obj.cpf = this.brMasker.writeCreateValue(obj.cpf, config);
      localStorage.setItem(STORAGE_KEYS.membro, JSON.stringify(obj));
    }
  }

  getComentarios(id: number): ComentarioDTO {
    let str = localStorage.getItem(STORAGE_KEYS.comentarios + id);

    if (str != null) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  setComentarios(obj: ComentarioDTO) {
    if (obj != null) {
      localStorage.setItem(
        STORAGE_KEYS.comentarios + obj.id,
        JSON.stringify(obj)
      );
    }
  }

  setRemoveComentarios(obj: ComentarioDTO) {
    localStorage.removeItem(STORAGE_KEYS.comentarios + obj.id);
  }

  getReferenciaLida(id: number): boolean {
    let str = localStorage.getItem(STORAGE_KEYS.referenciaLida + id);

    if (str != null) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  setReferenciaLida(id: number, isChecked: boolean) {
    if (id != null) {
      localStorage.setItem(
        STORAGE_KEYS.referenciaLida + id,
        JSON.stringify(isChecked)
      );
    }
  }

  setRemoveReferencia(id: number) {
    localStorage.removeItem(STORAGE_KEYS.referenciaLida + id);
  }

  temPerfilAdminLider(): boolean {
    let usr = JSON.parse(localStorage.getItem(STORAGE_KEYS.membro));
    let isPermite = false;
    if (usr == null) {
      return false;
    }

    usr.perfis.forEach((perfil) => {
      if (perfil == "ADMIN" || perfil == "LIDER") {
        isPermite = true;
      }
    });

    return isPermite;
  }

  temPerfilVisitante(): boolean {
    let usr = JSON.parse(localStorage.getItem(STORAGE_KEYS.membro));
    let isPermite = false;
    if (usr == null) {
      return false;
    }

    usr.perfis.forEach((perfil) => {
      if (perfil == "VISITANTE") {
        isPermite = true;
      }
    });
    return isPermite;
  }

  getIgreja() {
    let igreja = localStorage.getItem(STORAGE_KEYS.igreja);

    if (igreja != null) {
      return JSON.parse(igreja);
    } else {
      return null;
    }
  }

  setIgreja(igreja: IgrejaInfoDTO) {
    if (igreja != null) {
      let config: BrMaskModel = new BrMaskModel();
      config.mask = "00000-000";
      igreja.endereco.cep = this.brMasker.writeCreateValue(
        igreja.endereco.cep,
        config
      );
      config.phone = true;
      let telefones: string[] = new Array<string>();

      igreja.telefones.forEach((phone) => {
        telefones.push(this.brMasker.writeCreateValue(phone, config));
      });
      igreja.telefones = telefones;

      config = new BrMaskModel();

      config.mask = "00.000.000/0000-00";

      igreja.cnpj = this.brMasker.writeCreateValue(igreja.cnpj, config);

      localStorage.setItem(STORAGE_KEYS.igreja, JSON.stringify(igreja));
    } else {
      localStorage.removeItem(STORAGE_KEYS.igreja);
    }
  }
}
