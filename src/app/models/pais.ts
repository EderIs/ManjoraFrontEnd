
export class Pais{
    id?: number;
    nombrePais: string;


    constructor(pais : string []){
        this.id= parseInt(pais[0]);
        this.nombrePais= pais[1];
    }

    public getPais(nombrePais: string){
        this.nombrePais = nombrePais;
    }
}

