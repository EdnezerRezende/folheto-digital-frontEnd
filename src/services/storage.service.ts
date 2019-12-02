import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Comentarios } from "../models/comentarios";
import { Membro } from "../models/membro";

@Injectable()
export class StorageService {

    membro:Membro = new Membro();
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

    getMembro() : Membro {
        let usr = localStorage.getItem(STORAGE_KEYS.membro);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setMembro(obj : Membro) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.membro);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.membro, JSON.stringify(obj));
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

    setRemoveReferencia(id:number){
        localStorage.removeItem(STORAGE_KEYS.referenciaLida+id);
    }

    temPerfilAdminLider() : boolean {
        let usr = JSON.parse(localStorage.getItem(STORAGE_KEYS.membro));
        let isPermite = false;
        if (usr == null) {
            return false;
        }
       
        usr.perfis.forEach(perfil => {
            if ( perfil == "ADMIN" || perfil == "LIDER" ){
                isPermite = true;
            } 
        });

        return isPermite;
    }
}
