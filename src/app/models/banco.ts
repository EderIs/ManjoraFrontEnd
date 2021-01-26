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
public getPais():Pais{
return this.pais;
}
public setPais(pais:Pais):void{

this.pais=pais;
}

}