import{Estado}from './estado';
import{Titulo}from './titulo';
import{Usuario}from './usuario';


export class Contacto {
    id?: number;
    nombreContacto: string;
    tipoContacto: boolean;
    fotografia: string;
    contacto: Contacto;
    calle: string;
    calleSecundaria: string;
    ciudad: string;
    estado: Estado;
    codigoPostal: number;
    nif: string;
    puestoTrabajo: string;
    telefono: string;
    movil: string;
    correoElectronico: string;
    sitioWeb: string;
    titulo: Titulo;
    notas: string;
    rol: boolean;
    usuario: Usuario;
    referenciaInterna: string;
    pathImagen: String;
    fechaCreacion: Date;
    

     constructor(
        nombreContacto: string,
        tipoContacto: boolean,
        fotografia: string,
        contacto: Contacto,
        calle: string,
        calleSecundaria: string,
        ciudad: string,
        estado: Estado,
        codigoPostal: number,
        nif: string,
        puestoTrabajo: string,
        telefono: string,
        movil: string,
        correoElectronico: string,
        sitioWeb: string,
        titulo: Titulo, 
        notas: string,
        rol: boolean,
        usuario: Usuario,
        referenciaInterna: string,
        nombreImagen: String,
        fechaCreacion: Date
      
    ) 
    {
        this.nombreContacto = nombreContacto;
        this.tipoContacto = tipoContacto;
        this.fotografia = fotografia;
        this.contacto= contacto;
        this.calle = calle;
        this.calleSecundaria = calleSecundaria;
        this.ciudad = ciudad;
        this.estado = estado;
        this.codigoPostal = codigoPostal;
        this.nif = nif;
        this.puestoTrabajo = puestoTrabajo;
        this.telefono = telefono;
        this.movil = movil;
        this.correoElectronico = correoElectronico;
        this.sitioWeb = sitioWeb;
        this.titulo = titulo;
        this.notas = notas;
        this.rol = rol;
        this.usuario = usuario;
        this.referenciaInterna = referenciaInterna;
        this.pathImagen = nombreImagen;
        this.fechaCreacion = fechaCreacion;

    }
    
        public setEstado(estado:Estado):void{
        
        this.estado=estado;
        }

        public getTitulo():Titulo{
            return this.titulo;
            }
            public setTitulo(titulo:Titulo):void{
            
            this.titulo=titulo;
            }
 

}
