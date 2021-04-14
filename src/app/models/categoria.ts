import { Usuario } from "./usuario";


export class Categoria{

	id?:number;
     nombre: String;
	 usuario : Usuario;
	 estatus: boolean;

	constructor(nombre : String, usuario: Usuario , estatus : boolean){
	this.nombre = nombre;
	this.usuario = usuario;
	this.estatus = estatus;
	}


}