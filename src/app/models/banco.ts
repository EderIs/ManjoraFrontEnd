import {Estado}from './estado'
import { Pais } from './pais';


export class Banco {

 id?:number;
 nombre:string;
 codigoIdenBancaria:string;
 calle:string;
 calleSecundaria:string;
 ciudad:string;
 pais:Pais
 codigoPostal:number;
 telefono:string;
 correoElectronico:string;
 activo:boolean;

constructor(nombre:string,codigoIdenBancaria:string,calle:string,calleSecundaria:string,ciudad:string,pais:Pais,
   codigoPostal:number,telefono:string,correoElectronico:string,activo:boolean,
    ){

        this.nombre=nombre;
        this.codigoIdenBancaria=codigoIdenBancaria;
        this.calle=calle;
        this.calleSecundaria=calleSecundaria;
        this.ciudad=ciudad;
        this.pais=pais;
        this.codigoPostal=codigoPostal;
        this.telefono=telefono;
        this.correoElectronico=correoElectronico;
        this.activo=activo;
}

constructor2():void {
    this.nombre='';
    this.codigoIdenBancaria='';
    this.calle='';
    this.calleSecundaria='';
    this.ciudad='';
    this.pais=null;
    this.codigoPostal=0;
    this.telefono='';
    this.correoElectronico='';
    this.activo=false;
    
}


}