import { Etapa } from "./Etapa";
import { Usuario } from "./usuario";

export class Tarea{
    
	id?:number;

	nombre: String;
	
	usuario: Usuario;
	
	etapa : Etapa;
	
	fechaInicio : Date;
	
	fechaFinal: Date;
	
	estatus: boolean;

constructor(nombre : String, usuario : Usuario,etapa : Etapa, 
    fechaInicio : Date, fechaFinal : Date, estatus: boolean){

this.nombre = nombre;
this.usuario = usuario;
this.etapa = etapa;
this.fechaInicio = fechaInicio;
this.fechaFinal = fechaFinal;
this.estatus = estatus;

}
}