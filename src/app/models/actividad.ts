import { Tarea } from "./tarea";
import { Usuario } from "./usuario";

export class Actividad{

    id?:number;
    actividad: String;
	resumen: String;
	fechaInicio: Date;
	fechaFinal: Date;
	usuario: Usuario;
	estadoT: boolean;
    tarea: Tarea;
    fechaEntrega : String;

constructor(actividad: String, resumen: String, fechaInicio : Date,
     fechaFinal: Date, usuario: Usuario, estadoT : boolean ){

        this.actividad = actividad;
        this.resumen = resumen;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.usuario = usuario;
        this.estadoT = estadoT;
}
}