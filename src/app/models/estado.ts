import{Pais}from './pais';

export class Estado {
    id?: number;
    nombreEstado: string;
    codigo: number;
    pais: Pais;


    constructor(estado : string []){
        this.id= parseInt(estado[0]);
        this.nombreEstado= estado[1];
        this.codigo= parseInt(estado[2]);
    }

    public setEstado(nombreEstado: string, codigo:number, pais:Pais){
        this.nombreEstado = nombreEstado;
        this.codigo = codigo;
        this.pais = pais
    }

    public getPais():Pais{
    return this.pais;
    }

    public setPais(pais:Pais):void{
    this.pais=pais;
    }
     
}
