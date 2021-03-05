import { Usuario } from "./usuario";

export class Notas {

    id?: number;
    nombreNotas: String;
    usuario: Usuario;

    constructor(nombreNotas: String, usuario: Usuario) {

        this.nombreNotas = nombreNotas;
        this.usuario = usuario;
    }


}