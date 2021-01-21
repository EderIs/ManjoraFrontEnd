import {Estado}from './estado'

export class Banco{

 id?:number;
 nombre:string;
 codigoIdenBancaria:string;
 calle:string;
 calleSecundaria:string;
 ciudad:string;
 estado:Estado
 codigoPostal:number;
 telefono:string;
 correoElectronico:string;
 activo:string;


constructor(nombre:string,codigoIdenBancaria:string,calle:string,calleSecundaria:string,ciudad:string,estado:Estado,
   codigoPostal:number,telefono:string,correoElectronico:string,activo:string,
    ){

        this.nombre=nombre;
        this.codigoIdenBancaria=codigoIdenBancaria;
        this.calle=calle;
        this.calleSecundaria=calleSecundaria;
        this.ciudad=ciudad;
        this.estado=estado;
        this.codigoPostal=codigoPostal;
        this.telefono=telefono;
        this.correoElectronico=correoElectronico;
        this.activo=activo;
}




}