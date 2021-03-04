import { Usuario } from "./usuario";

export class Proyecto {

    id?: number;
    nombreTarea: String;
    usuario: Usuario;

    constructor(nombreTarea: String, usuario: Usuario) {

        this.nombreTarea = nombreTarea;
        this.usuario = usuario;
    }


}