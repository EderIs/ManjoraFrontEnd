import { Time } from "@angular/common";
import { Contacto } from "./contacto";

export class CalendarioBase{

     id?:number;
     resumen:String;
	 fecha: Date;
	 horaInicio: Date;
	 horaFinal : Date;
	 contactos : Contacto [];

    constructor(id:number,resumen:String,fecha:Date,horaInicio:Date, horaFinal:Date,contactos:Contacto[]){
    this.id =id;
    this.resumen = resumen;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFinal = horaFinal;
    this.contactos = contactos;    
    }
    
}