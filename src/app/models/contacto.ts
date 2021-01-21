import { Byte } from "@angular/compiler/src/util";
import{Estado}from './estado';
import{Titulo}from './titulo';
import{Usuario}from './usuario';

export class Contacto {
    id?: number;
    nombreContacto: string;
    tipoContacto: boolean;
    fotografia: Byte;
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

    constructor(
        nombreContacto: string,
        tipoContacto: boolean,
        fotografia: Byte,
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
        referenciaInterna: string
    ) {
        this.nombreContacto = nombreContacto;
        this.tipoContacto = tipoContacto;
        this.fotografia = fotografia;
        this.contacto = contacto;
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

    }



}
