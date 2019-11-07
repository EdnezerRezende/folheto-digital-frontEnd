import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Comentarios } from "../models/comentarios";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getComentarios(id:number) : Comentarios {
        let str = localStorage.getItem(STORAGE_KEYS.comentarios+id);

        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }
    
    setComentarios(obj : Comentarios) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.comentarios+obj.id, JSON.stringify(obj));
        } 
    }

    setRemoveComentarios(obj : Comentarios) {
      localStorage.removeItem(STORAGE_KEYS.comentarios+obj.id);
    }

    getReferenciaLida(id:number) : boolean {
        let str = localStorage.getItem(STORAGE_KEYS.referenciaLida+id);

        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }
    
    setReferenciaLida(id : number, isChecked:boolean) {
        if (id != null) {
            localStorage.setItem(STORAGE_KEYS.referenciaLida+id, JSON.stringify(isChecked));
        } 
    }
}
