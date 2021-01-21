import { Contacto } from "./contacto";
import { Departamento } from "./departamento";
import { HoraLaboral } from "./horaLaboral";
import { Puesto } from "./puesto";
import { Usuario } from "./usuario";

export class Empleado {
    id?: number;
    fotografia: ByteLengthChunk;
    nombreEmpleado: String;
    idCategoria: number;
    direccionTrabajo: Contacto;
    idPuesto: Puesto;
    tituloTrabajo: String;
    idResponsable: Empleado;
    idMonitor: Empleado;
    horasLaborales: HoraLaboral;
    //idCuentaBancaria: CuentaBancaria;
    direccionPrivada: String;
    contactoEmergencia: String;
    telefonoEmergencia: String;
    kmCasaTrabajo: number;
    Sexo: String;
    estadoCivil: String;
    numeroHijos: number;
    fechaNacimiento: Date;
    lugarNacimiento: String;
    nivelCertificado: String;
    escuela: String;
    notaAdicional: String;
    idUsuario: Usuario;
    nota: String;
    estado: boolean;

    constructor(fotografia: ByteLengthChunk, nombreEmpleado: String, idCategoria: number, direccionTrabajo: Contacto, idPuesto: Puesto,
        tituloTrabajo: String, idResponsable: Empleado, idMonitor: Empleado, horasLaborales: HoraLaboral, direccionPrivada: String,
        contactoEmergencia: String, telefonoEmergencia: String, kmCasaTrabajo: number, Sexo: String,
        estadoCivil: String, numeroHijos: number, fechaNacimiento: Date, lugarNacimiento: String, nivelCertificado: String,
        escuela: String, notaAdicional: String, idUsuario: Usuario, nota: String, estado: boolean){
        this.fotografia = fotografia;
        this.nombreEmpleado = nombreEmpleado;
        this.idCategoria = idCategoria;
        this.direccionTrabajo = direccionTrabajo;
        this.idPuesto = idPuesto;
        this.tituloTrabajo = tituloTrabajo;
        this.idResponsable = idResponsable;
        this.idMonitor = idMonitor;
        this.horasLaborales = horasLaborales;
        this.direccionPrivada = direccionPrivada;
        this.contactoEmergencia = contactoEmergencia;
        this,telefonoEmergencia = telefonoEmergencia;
        this.kmCasaTrabajo = kmCasaTrabajo;
        this.Sexo = Sexo;
        this.estadoCivil = estadoCivil;
        this.numeroHijos = numeroHijos;
        this.fechaNacimiento = fechaNacimiento;
        this.lugarNacimiento = lugarNacimiento;
        this.nivelCertificado = nivelCertificado;
        this.escuela =escuela;
        this.notaAdicional = notaAdicional;
        this.idUsuario = idUsuario;
        this.nota = nota;
        this.estado = estado;
    }
}