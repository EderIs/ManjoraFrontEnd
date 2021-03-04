import { Proyecto } from "./proyecto";

export class Etapa{

	id?:number;
     nombre: String;
	 proyecto : Proyecto;
	 estatus: boolean;

constructor(nombre : String, proyecto: Proyecto , estatus : boolean){
this.nombre = nombre;
this.proyecto = proyecto;
this.estatus = estatus;
}


}