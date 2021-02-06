export class Usuario {
    id?: number;
    nombreUsuario: string;
    email: string;
    password: string;
    fechaCreacion: Date;
    ultimoAcceso: Date;
    estado: boolean;
    authorities: string[];


    constructor(nombreUsuario: string, email: string, password: string, fechaCreacion: Date, ultimoAcceso: Date, estado: boolean) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.fechaCreacion = fechaCreacion;
        this.ultimoAcceso = ultimoAcceso;
        this.estado = estado;
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





