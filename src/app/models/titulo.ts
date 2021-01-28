import { NumberSymbol } from "@angular/common";

export class Titulo{

    id? : number;
    titulo : string;
    abreviatura: string;




    public setTitulo(titulo: string, abreviatura:string){
        this.titulo = titulo;
        this.abreviatura = abreviatura;
    }

    constructor(titulo : string []){
        this.id= parseInt(titulo[0]);
        this.titulo= titulo[1];
        this.abreviatura= titulo[2];
    }



}