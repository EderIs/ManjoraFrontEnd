export class Usuario {
    id?: number;
    nombreUsuario: string;
    direccionCorreo: string;
    contrasena: string;
    fechaCreacion: Date;
    ultimoAcceso: Date;
    estado: boolean;

    constructor(nombreUsuario: string, direccionCorreo: string, contrasena: string, fechaCreacion: Date, ultimoAcceso: Date, estado: boolean){
        this.nombreUsuario = nombreUsuario;
        this.direccionCorreo = direccionCorreo;
        this.contrasena = contrasena;
        this.fechaCreacion = fechaCreacion;
        this.ultimoAcceso = ultimoAcceso;
        this.estado = estado;
    }
}




