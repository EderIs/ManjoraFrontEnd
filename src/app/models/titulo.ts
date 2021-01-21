import { NumberSymbol } from "@angular/common";

export class Titulo{

    id? : number;
    titulo : string;
    abreviatura: string;


constructor(titulo:string, abreviatura: string){

this.titulo = titulo;
this.abreviatura = abreviatura;

}
}