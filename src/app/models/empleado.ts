import { Contacto } from "./contacto";
import { HoraLaboral } from "./horaLaboral";
import { Puesto } from "./puesto";
import { Usuario } from "./usuario";

export class Empleado {
    id?: number;
    fotografia: ImageBitmap;
    nombreEmpleado: string;
    idCategoria: number;
    direccionTrabajo: Contacto;
    idPuesto: Puesto;
    tituloTrabajo: string;
    idResponsable: Empleado;
    idMonitor: Empleado;
    horasLaborales: HoraLaboral;
    //idCuentaBancaria: CuentaBancaria;
    direccionPrivada: string;
    contactoEmergencia: string;
    telefonoEmergencia: string;
    kmCasaTrabajo: number;
    sexo: string;
    estadoCivil: string;
    numeroHijos: number;
    fechaNacimiento: Date;
    lugarNacimiento: string;
    nivelCertificado: string;
    escuela: string;
    notaAdicional: string;
    idUsuario: Usuario;
    nota: string;
    estado: boolean;

    constructor(empleado: string[]){

        this.id=parseInt(empleado[0]);
        this.fotografia=JSON.parse(empleado[1]);
        this.nombreEmpleado=empleado[2];
        this.idCategoria=parseInt(empleado[3]);
        this.tituloTrabajo=empleado[4];
        this.direccionPrivada=empleado[5];
        this.contactoEmergencia=empleado[6];
        this.telefonoEmergencia=empleado[7];
        this.kmCasaTrabajo=parseFloat(empleado[8]);
        this.sexo=empleado[9];
        this.estadoCivil=empleado[10];
        this.numeroHijos=parseInt(empleado[11]);
        this.fechaNacimiento=new Date(Date.parse(empleado[12]));
        this.lugarNacimiento=empleado[13];
        this.nivelCertificado=empleado[14];
        this.escuela=empleado[15];
        this.notaAdicional=empleado[16];
        this.nota=empleado[17];
        this.estado=JSON.parse(empleado[18]);
    }

    setEmpleado(fotografia: ImageBitmap, nombreEmpleado: string, idCategoria: number, direccionTrabajo: Contacto, idPuesto: Puesto,
        tituloTrabajo: string, idResponsable: Empleado, idMonitor: Empleado, horasLaborales: HoraLaboral, direccionPrivada: string,
        contactoEmergencia: string, telefonoEmergencia: string, kmCasaTrabajo: number, sexo: string,
        estadoCivil: string, numeroHijos: number, fechaNacimiento: Date, lugarNacimiento: string, nivelCertificado: string,
        escuela: string, notaAdicional: string, idUsuario: Usuario, nota: string, estado: boolean){
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
        this.sexo = sexo;
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

    public getDireccionTrabajo():Contacto{
        return this.direccionTrabajo;
    }
    
    public setDirecciontrabajo(direccionTrabajo:Contacto):void{
        this.direccionTrabajo=direccionTrabajo;
    }

    public getPuesto():Puesto{
        return this.idPuesto;
    }
        
    public setPuesto(idPuesto:Puesto):void{
        this.idPuesto=idPuesto;
    }

    public getResponsable():Empleado{
        return this.idResponsable;
    }
        
    public setResponsable(idResponsable:Empleado):void{
        this.idResponsable=idResponsable;
    }

    public getMonitor():Empleado{
        return this.idMonitor;
    }
        
    public setMonitor(idMonitor:Empleado):void{
        this.idMonitor=idMonitor;
    }

    public getHorasLaborales():HoraLaboral{
        return this.horasLaborales;
    }
        
    public setHorasLaborales(horasLaborales:HoraLaboral):void{
        this.horasLaborales=horasLaborales;
    }

    public getUsuario():Usuario{
        return this.idUsuario;
    }
        
    public setUsuario(idUsuario:Usuario):void{
        this.idUsuario=idUsuario;
    }
}