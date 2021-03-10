import { Usuario } from "./usuario";

export class Notificacion{


    id?:number;
    titulo : String;
    resumen : String;
    fechaLlegada : String;
    usuarioDestino : Usuario;    
    estatus : boolean;
    ruta :String;

    constructor(id : number, titulo:String, resumen:String, fechaLlegada : String, usuarioDestino: Usuario,
        estatus: boolean, ruta:String){


            this.id =id;
            this.titulo= titulo;
            this.resumen = resumen;
            this.fechaLlegada = fechaLlegada;
            this.usuarioDestino = usuarioDestino;
            this.estatus = estatus;
            this.ruta = ruta;
}

}