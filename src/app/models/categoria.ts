import { Notas } from "./notas";

export class Categoria{

	id?:number;
     nombre: String;
	 notas : Notas;
	 estatus: boolean;

constructor(nombre : String, notas: Notas , estatus : boolean){
this.nombre = nombre;
this.notas = notas;
this.estatus = estatus;
}


}