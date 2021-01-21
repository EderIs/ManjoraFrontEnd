import{Pais}from './pais';

export class Estado {
    id?: number;
    nombreEstado: string;
    codigo:number;
    pais: Pais;

    
    constructor(nombreEstado: string,codigo: number, pais: Pais){
        this.nombreEstado=nombreEstado;
        this.codigo=codigo;
        this.pais=pais;
        
    }
}
