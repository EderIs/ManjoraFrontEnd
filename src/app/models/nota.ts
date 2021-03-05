import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export class Nota {

    id?: number;

    nombre: String;

    usuario: Usuario;

    categoria: Categoria;

    fechaInicio: Date;

    fechaFinal: Date;

    estatus: boolean;

    constructor(nombre: String, usuario: Usuario, categoria: Categoria,
        fechaInicio: Date, fechaFinal: Date, estatus: boolean) {

        this.nombre = nombre;
        this.usuario = usuario;
        this.categoria = categoria;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.estatus = estatus;

    }
}