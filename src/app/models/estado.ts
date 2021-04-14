import{Pais}from './pais';

export class Estado {
    id?: number;
    nombreEstado: string;
    codigo: number;
    pais: Pais;



    public setEstado(nombreEstado: string, codigo:number, pais: Pais){
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
     

        constructor(){
        }

}
