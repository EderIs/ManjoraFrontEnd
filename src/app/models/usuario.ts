export class Usuario {
    id?: number;
    nombre: String;
    nombreUsuario: string;
    email: string;
    password: string;
    fechaCreacion: Date;
    ultimoAcceso: Date;
    estado: boolean;
    authorities: string[];
    pathImagen: String;

    constructor(nombre: String, nombreUsuario: string, email: string, password: string, fechaCreacion: Date, ultimoAcceso: Date,
        estado: boolean, nombreImagen: String) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.fechaCreacion = fechaCreacion;
        this.ultimoAcceso = ultimoAcceso;
        this.estado = estado;
        this.pathImagen = nombreImagen;
    }

    public setNombreUsuario(nombreUsuario: string): void {

        this.nombreUsuario = nombreUsuario;

    }

    public setContrasena(password: string): void {

        this.password = password;
    }

    public setUltimoAcceso(ultimoAcceso: Date): void {

        this.ultimoAcceso = ultimoAcceso;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

}





